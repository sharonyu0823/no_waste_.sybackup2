import '../styles/06-event-05-ticket.scss'

import jBang from '../img/bang.png'
import jTicket from '../img/ticket.png'

function Ticket() {
  return (
    <>
      <div class="j-event-middle-ticket">
        <div class="j-cate-banner">
          <div class="j-cate-banner-deco">
            <div>我的票卷</div>
          </div>
        </div>
        <div class="j-bang-hide">
          <div class="j-bang">
            <img src={jBang} alt="" />
          </div>

          <img class="j-ticket" src={jTicket} alt="" />
        </div>
      </div>
    </>
  )
}

export default Ticket