#!/usr/bin/env node

import { log } from '@clack/prompts'
import { cli } from '@/cli'

cli().catch((error: unknown) => {
  log.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
