import React from 'react'

// /mainName dashboard
// menuName = dashboard_menu
// url /dashboard
export default function LeftMenuLinkCard(props) {
  return (
      <li onClick={() => enableLinks("dashboard")}>
            {dash ? "" : <></>}
            <div className={dash ? `${Styles.styles}` : `${Styles.styles1}`}>
              <div className={Styles.icon}>
                <MdOutlineDashboard />
              </div>

              <span className={Styles.title}>{props.mainName}</span>

              <div className={Styles.arrows}>
                <div className={Styles.top} id="top_dash">
                  <IoIosArrowForward />
                </div>
                <div className={Styles.bottom} id="bottom_dash">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            <ul id={props.menuName}>
              <li>
                <Link href={props.url}>Home Dashboard</Link>
              </li>
            </ul>
          </li>
  )
}
