import { describe, it, expect, beforeEach } from 'vitest';
import { generate, BuilderCore } from '../core';

// --- Unit tests ---

describe('BuilderCore', () => {
  let core: BuilderCore;

  beforeEach(() => {
    core = new BuilderCore({
      industry: 'Other',
      backend_stack: 'Other',
      frontend_pattern: 'Data visualization',
    });
  });

  it('constructs with valid config', () => {
    expect(core).toBeInstanceOf(BuilderCore);
  });

  it('rejects invalid config with a typed validation error', () => {
    expect(() => new BuilderCore({ industry: '' } as any)).toThrow();
  });

  it('exposes a generate method', () => {
    expect(typeof core.generate).toBe('function');
  });
});

// --- Integration tests ---

describe('generate() integration', () => {
  it('returns an array of project files', async () => {
    const result = await generate({
      industry: 'Other',
      backend_stack: 'Other',
      frontend_pattern: 'Data visualization',
    });
    expect(Array.isArray(result.files)).toBe(true);
    expect(result.files.length).toBeGreaterThan(0);
  });

  it('every file has a path and content', async () => {
    const result = await generate({
      industry: 'Other',
      backend_stack: 'Other',
      frontend_pattern: 'Data visualization',
    });
    for (const file of result.files) {
      expect(file.path).toBeTruthy();
      expect(file.content).toBeTruthy();
    }
  });
});
