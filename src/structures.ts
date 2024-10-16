export interface Metadata {
	className: string
	functionName: string
}

export interface LogProps {
	className: string
	method: string
}

export interface PreLogProps extends LogProps {
	args: string[]
}

export interface PostLogProps extends LogProps {
	result: unknown
	suffix: string
}
