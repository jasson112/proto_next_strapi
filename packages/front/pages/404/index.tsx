import thanksStyles from "../../styles/Thanks.module.scss";
import Link from "next/link";

const index = () => {
  return (
    <>
      <section className={thanksStyles.section}>
        <div className={thanksStyles.container}>
          <div className={thanksStyles.figure}>
            <img src="figure.png" />
          </div>
          <div className={thanksStyles.content}>
            <h1>404</h1>
            <h3>Page not found</h3>
            <Link href="/">
            <a className={thanksStyles.goTo}>Go to main page</a>
          </Link>
          </div>
          <div className={thanksStyles.content_image}>
            <img src="thanks.png" />
          </div>
        </div>
      </section>
    </>
  )
}

export default index
