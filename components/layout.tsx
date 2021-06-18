import TopBar from './top-bar'

interface Props {
  children: JSX.Element
}

export default function Layout(props: Props): JSX.Element {
  const { children } = props

  return (
    <div>
      <TopBar></TopBar>
      {children}
    </div>
  )
}
