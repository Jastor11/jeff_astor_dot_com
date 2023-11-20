export type SocialIconSize = "sm" | "md" | "lg"

export function getSocials(size: SocialIconSize = "sm") {
	const socialIcons = [
		{
			path: `https://github.com/jastor11`,
			icon: `github`,
			size,
		},
		{
			path: `https://codepen.io/jastor11`,
			icon: `codepen`,
			size,
		},
		{
			path: `https://www.youtube.com/channel/UCssdrVVitOCQvj44Yl1hAIQ`,
			icon: `youtube`,
			size,
		},
		{
			path: `https://www.linkedin.com/in/mrjeffastor/`,
			icon: `linkedin`,
			size,
		},
		{
			path: `mailto: jeff@astor.io`,
			icon: `email`,
			size,
		},
		{
			path: `https://facebook.com/sirjeffastor`,
			icon: `facebook`,
			size,
		},
		{
			path: `https://www.instagram.com/jastronaut/`,
			icon: `instagram`,
			size,
		},
		{
			path: `https://twitter.com/jastornaut`,
			icon: `twitter`,
			size,
		},
	] as const

	return socialIcons
}