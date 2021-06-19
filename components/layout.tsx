import Head from 'next/head'
import TopBar from './top-bar'

interface Props {
  children: JSX.Element
}

export default function Layout(props: Props): JSX.Element {
  const { children } = props

  return (
    <div>
      <Head>
        <title>rocket fire</title>
        <meta property="og:title" content="rocket fire" key="title" />
      </Head>
      <TopBar></TopBar>
      {children}
    </div>
  )
}
