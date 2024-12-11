import type { Logger as KrautersLogger } from '@krauters/logger'

export type Logger = Console | KrautersLogger

export interface LogProps {
	className: string
	method: string
}

export interface Metadata {
	className: string
	functionName: string
}

export interface PostLogProps extends LogProps {
	result: unknown
	suffix: string
}

export interface PreLogProps extends LogProps {
	args: string[]
}
