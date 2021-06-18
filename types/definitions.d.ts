interface Launch {
  id: string
  launch_date_local: string
  links: {
    article_link: string
    video_link: string
  }
  mission_name: string
  rocket: {
    rocket_name: string
  }
  site: string
}
