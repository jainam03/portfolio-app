const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const moduleCache = new Map();

function loadTypeScript(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (moduleCache.has(absolutePath)) return moduleCache.get(absolutePath);

  const source = fs.readFileSync(absolutePath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const loadedModule = { exports: {} };
  moduleCache.set(absolutePath, loadedModule.exports);
  const localRequire = (specifier) => {
    if (specifier === '@/data/content') return loadTypeScript('src/data/content.ts');
    if (specifier === '@/lib/projects') return loadTypeScript('src/lib/projects.ts');
    return require(specifier);
  };

  vm.runInNewContext(compiled, {
    module: loadedModule,
    exports: loadedModule.exports,
    require: localRequire,
    process: { env: {} },
  }, { filename: absolutePath });
  moduleCache.set(absolutePath, loadedModule.exports);
  return loadedModule.exports;
}

const { projects, personalInfo } = loadTypeScript('src/data/content.ts');
const { getProjectBySlug, getProjectSlugs } = loadTypeScript('src/lib/projects.ts');
const { getArtifactPath } = loadTypeScript('src/lib/artifacts.ts');
const { escapeEmailHtml, validateContactPayload } = loadTypeScript('src/lib/contact-validation.ts');
const { takeContactRateLimitToken } = loadTypeScript('src/lib/contact-rate-limit.ts');
const { trapDialogTabFocus } = loadTypeScript('src/lib/dialog-focus.ts');

test('project slugs are unique and every project has a shareable route', () => {
  const slugs = Array.from(projects, (project) => project.slug);
  assert.equal(new Set(slugs).size, projects.length);
  const routeSlugs = Array.from(getProjectSlugs(), (entry) => entry.slug);
  assert.deepEqual(routeSlugs.sort(), [...slugs].sort());
  for (const slug of slugs) assert.equal(getProjectBySlug(slug).slug, slug);
  assert.equal(getProjectBySlug('missing-project'), undefined);
});

test('project metadata and artifact configuration are internally consistent', () => {
  const validFocusAreas = new Set(['operations', 'analytics', 'product', 'technology']);
  for (const project of projects) {
    assert.ok(project.title && project.projectType && project.summary);
    assert.ok(project.focusAreas.length > 0);
    for (const focusArea of project.focusAreas) assert.ok(validFocusAreas.has(focusArea));
    for (const artifact of project.artifacts ?? []) {
      if (artifact.mode === 'storage-pdf') assert.ok(getArtifactPath(artifact.storageKey));
      else assert.match(artifact.url, /^https:\/\//);
      if (!artifact.available) assert.ok(artifact.unavailableReason);
    }
  }
  assert.equal(personalInfo.siteUrl, 'https://jainam-chheda.vercel.app');
});

test('artifact endpoint only resolves known presentation keys', () => {
  assert.equal(getArtifactPath('digiyatra'), 'digiyatra_presentation.pdf');
  assert.equal(getArtifactPath('qsr'), 'qsr_presentation.pdf');
  assert.equal(getArtifactPath('unknown'), undefined);
  assert.equal(getArtifactPath(null), undefined);
});

test('contact validation trims fields and enforces the required shape and limits', () => {
  const valid = validateContactPayload({ name: '  Jainam  ', email: ' jainam@example.com ', message: ' Hello ' });
  assert.equal(valid.success, true);
  assert.equal(valid.data.name, 'Jainam');
  assert.equal(valid.data.message, 'Hello');
  assert.equal(validateContactPayload(null).success, false);
  assert.equal(validateContactPayload({ name: 'A', email: 'bad', message: 'Hello' }).success, false);
  assert.equal(validateContactPayload({ name: 'A', email: 'a@b.com', message: 'x'.repeat(5001) }).success, false);
  assert.equal(validateContactPayload({ name: 'A', email: 'a@b.com', subject: 'Hi\nBcc:bad', message: 'Hello' }).success, false);
});

test('contact email HTML escapes user-controlled markup', () => {
  assert.equal(escapeEmailHtml(`<img src="x" onerror='x'>&`), '&lt;img src=&quot;x&quot; onerror=&#39;x&#39;&gt;&amp;');
});

test('contact honeypot value is preserved for the route to reject quietly', () => {
  const result = validateContactPayload({ name: 'A', email: 'a@example.com', message: 'Hello', website: 'bot-filled' });
  assert.equal(result.success, true);
  assert.equal(result.data.website, 'bot-filled');
});

test('contact rate limit allows five messages and blocks the sixth per window', () => {
  const key = `test-${Date.now()}`;
  const now = 10_000_000;
  for (let i = 0; i < 5; i += 1) assert.equal(takeContactRateLimitToken(key, now + i).allowed, true);
  const blocked = takeContactRateLimitToken(key, now + 5);
  assert.equal(blocked.allowed, false);
  assert.ok(blocked.retryAfterSeconds > 0);
  assert.equal(takeContactRateLimitToken(key, now + 600_001).allowed, true);
});

test('dialog keyboard focus wraps at both ends and handles empty dialogs', () => {
  const focused = [];
  const first = { focus: () => focused.push('first') };
  const last = { focus: () => focused.push('last') };
  const makeEvent = (shiftKey) => ({ key: 'Tab', shiftKey, prevented: false, preventDefault() { this.prevented = true; } });

  const backwards = makeEvent(true);
  assert.equal(trapDialogTabFocus(backwards, [first, last], first, () => focused.push('dialog')), true);
  assert.equal(backwards.prevented, true);
  assert.equal(focused.at(-1), 'last');

  const forwards = makeEvent(false);
  assert.equal(trapDialogTabFocus(forwards, [first, last], last, () => focused.push('dialog')), true);
  assert.equal(forwards.prevented, true);
  assert.equal(focused.at(-1), 'first');

  const empty = makeEvent(false);
  assert.equal(trapDialogTabFocus(empty, [], null, () => focused.push('dialog')), true);
  assert.equal(focused.at(-1), 'dialog');
});

test('site metadata, robots, sitemap, and social preview use the shared site address', () => {
  const files = [
    'src/app/layout.tsx',
    'src/app/robots.ts',
    'src/app/sitemap.ts',
    'src/app/opengraph-image.tsx',
  ];
  for (const file of files) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    assert.ok(source.includes('personalInfo.siteUrl'), `${file} should use the shared site address`);
    assert.ok(!source.includes('jainamchheda.com'), `${file} should not hard-code the old address`);
  }
});
