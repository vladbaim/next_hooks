import React, {useContext} from "react"
import {useRouter} from "next/router"
import {ItemsContext, LangContext} from "context"

import Head from "next/head"
import {asTitle} from "utils/strings"
import {apiPath} from "config"

const header = () => {
	const router = useRouter()
	const [state] = useContext(ItemsContext)
	const [ln] = useContext(LangContext)
	const title = state[router?.asPath]?.title
		? `${asTitle(state[router?.asPath].title)} - ${state.config?.siteName}`
		: state.config?.siteName || ""
	const langs = state.loaded?.langs
	const favicon = `${apiPath}file?id=${state.config?.favicon}`
	return (
		<Head>
			<link rel="shortcut icon" href={favicon} />
			<title>{title}</title>
			{state[router?.asPath]?.metaDesc ? (
				<meta
					name="description"
					content={state[router?.asPath]?.metaDesc}
				></meta>
			) : null}
			{langs?.length > 1
				? langs?.map((lang) => (
						<link
							rel="alternate"
							key={lang.sign}
							href={`${state.config?.host}${router?.asPath.replace(
								`/${ln}`,
								`/${lang.sign}`
							)}`}
							hrefLang={lang.sign}
						/>
				  ))
				: null}
		</Head>
	)
}

export default header