export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: 'BizGlimpse',
	description: 'A comprehensive overview of business insights and market trends.',
	navItems: [
		{
			label: 'Sign In',
			href: '/',
		},
		{
			label: 'Home',
			href: '/home',
		}
	]
};
