import { execSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { confirm, isCancel, log, spinner, text } from '@clack/prompts'
import degit from 'degit'

export const REPO_SOURCE = 'adriablancafort/astack'
export const DEFAULT_FOLDER = 'my-app'

export async function cli() {
  const folder = await text({ message: 'Project folder', placeholder: DEFAULT_FOLDER })
  if (isCancel(folder)) process.exit(0)
  const projectName = folder ? folder.trim() : DEFAULT_FOLDER

  const install = await confirm({ message: 'Install dependencies?', initialValue: true })
  if (isCancel(install)) process.exit(0)

  const targetDir = resolve(process.cwd(), projectName)

  if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
    log.error(`Target directory is not empty: ${targetDir}`)
    process.exit(1)
  }

  const s = spinner()
  s.start(`Creating ${projectName}...`)
  await degit(REPO_SOURCE, { cache: false, force: true }).clone(targetDir)
  s.stop(`Created ${projectName}`)

  if (install) {
    log.step('Installing dependencies...')
    execSync('pnpm install --loglevel=error', { cwd: targetDir, stdio: 'inherit' })
    log.success(`All set. Run \`cd ${projectName}\` to start building.`)
  } else {
    log.success(`All set. Run \`cd ${projectName} && pnpm install\` to start building.`)
  }
}
