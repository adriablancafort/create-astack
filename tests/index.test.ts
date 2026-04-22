import { expect, test } from 'vitest'
import { DEFAULT_FOLDER, REPO_SOURCE } from '@/cli'

test('REPO_SOURCE points to correct repo', () => {
  expect(REPO_SOURCE).toBe('adriablancafort/astack')
})

test('DEFAULT_FOLDER has a value', () => {
  expect(DEFAULT_FOLDER.length).toBeGreaterThan(0)
})
