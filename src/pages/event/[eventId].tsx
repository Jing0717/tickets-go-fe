import requireAuth from '@/components/RequireAuth'
import { useGetEventContentQuery } from '@/store/homeApi'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

import dayjs from "dayjs";
import 'dayjs/locale/zh-cn';

interface Session {
  sessionId: string;
  location: string;
  startDate: string;
  startTime: string;
  endTime: string;
}


const EventPage = () => {
  const router = useRouter()
  const { eventId } = router.query

  dayjs.locale('zh-cn');

  const { data, error, isLoading } = useGetEventContentQuery(eventId as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const event = data.data.events;

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='relative pb-20 bg-brand-02'>
      <Image
        src='/event-hero.jpeg'
        alt='Event Image'
        className='max-h-[480px] top-[80px] absolute'
        fill
        style={{ objectFit: 'cover' }}
      />
      <div className='container mt-[520px]'>
        <h1 className='text-4xl font-bold mb-4'>{event.name}</h1>
        <div className='text-lg mb-4 font-noto-sans-tc'>
          <p><FontAwesomeIcon icon={faCalendar} className='text-brand-01 pr-4' />
          {dayjs(+event.sessions[0].startDate).format('YYYY/MM/DD(dd) HH:mm(Z)')}
          </p>
          <p><FontAwesomeIcon icon={faLocationDot} className='text-brand-01 pr-4' />{event.sessions[0].location}</p>
        </div>
        <div className='border-t mt-8'>
          <div className='flex space-x-4 mt-4 bg-white justify-between items-center px-6 pt-6 pb-[26px]'>
            <div className="">
              <button className='px-4 py-2 hover:border-2 hover:border-red-500 bg-white' onClick={() => scrollToSection('introduction')}>簡介</button>
              <button className='px-4 py-2 hover:border-2 hover:border-red-500' onClick={() => scrollToSection('programInfo')}>節目資訊</button>
              <button className='px-4 py-2 hover:border-2 hover:border-red-500' onClick={() => scrollToSection('ticketInfo')}>購票方式說明</button>
              <button className='px-4 py-2 hover:border-2 hover:border-red-500' onClick={() => scrollToSection('refundInfo')}>退票說明</button>
              <button className='px-4 py-2 hover:border-2 hover:border-red-500' onClick={() => scrollToSection('notice')}>注意事項</button>
              <button className='px-4 py-2 hover:border-2 hover:border-red-500' onClick={() => scrollToSection('eventTicket')}>活動票券</button>
            </div>
            <button className='bg-red-500 text-white py-4 px-[66px] leading-4'>立刻訂購</button>
          </div>

          <div className='mt-4'>
            <h2 id='introduction' className='text-2xl font-bold mb-2'>簡介</h2>
            <p className='mb-4' dangerouslySetInnerHTML={{ __html: event.description}}></p>
            <h2 id='programInfo' className='text-2xl font-bold mb-2'>節目資訊</h2>
            <p className='mb-4'>
              活動名稱：{event.name}<br />
              活動日期：{dayjs(+event.sessions[0].startDate).format('YYYY/MM/DD(dd) HH:mm(Z)')}<br />
              活動地點：{event.sessions[0].location}<br />
            </p>
          </div>
        </div>
      </div>
      <div className=''>
        <div className='container w-full'>
          <Image
            src='/image19.png'
            alt='Seat Image'
            width={600}
            height={400}
            className='w-full'
            style={{ objectFit: 'cover' }}
          />
          <h2 id='ticketInfo' className='text-2xl font-bold mb-2 mt-8'>
            購票方式說明<span className='block border-t border-gray-300 mt-2'></span>
          </h2>
          <p className='mb-4 bg-gray-04 p-6'>
            您的Tickets Go會員需完成"電子郵件地址及手機號碼驗證"才能進行購票流程，請至
            <a href='https://Tickets Go.com/users/edit' className='text-blue-500 underline'>
              https://Tickets Go.com/users/edit
            </a>
            確認是否您的電子郵件已經認證完畢。提醒您請勿使用Yahoo、Hotmail信箱註冊及驗證，以避免驗證信未能寄達。
          </p>
          <ol className='list-decimal pl-6 space-y-2'>
            <li>
              僅接受已完成手機號碼及電子郵件地址驗證之會員購買，購票前請先"加入會員"並盡早完成"手機號碼及電子郵件地址"驗證，以便進行購票流程，建議可於會員"設定"中的"報名預填資料"先行存檔「姓名」和「手機」，可減少購票時間快速進行下一步。
            </li>
            <li>
              為了確保您的權益，強烈建議您，在註冊會員或是結帳時填寫的聯絡人電子郵件，盡量不要使用Yahoo或Hotmail郵件信箱，以免因為擋信、漏信，甚至被視為垃圾郵件而無法收到『訂單成立通知信』。
            </li>
            <li>
              訂單成立通知信可能因其他因素未能寄達，僅提供交易通知之用，未收到訂單成立通知信不代表交易沒有成功，又或是刷卡付款失敗，請於付款期限之內再次嘗試刷卡（即便收到銀行的授權成功的簡訊或電子郵件），若訂單逾期取消，則表示訂單真的沒有成立，請再重新訂購。一旦無法確認於網站上的訂單是否交易成功，請至會員帳戶的"訂單"查詢您的消費資料，只要是成功的訂單，皆會顯示您所消費的票券明細，若查不到您所訂購的票券，表示交易並未成功，請重新訂票。
            </li>
            <li>
              Tickets
              Go系統沒有固定的清票時間，只要消費者沒有於期限內完成付款，未付款的票券就會陸陸續續釋放出來，消費者可隨時留意是否有釋出可售票券張數。
            </li>
            <li>在全家FamiPort購票為「自動配位」，若需自行選擇座位請於網站上購票。</li>
            <li>
              Tickets Go網站購票：
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  需加入會員並通過"手機號碼及電子郵件地址"驗證，每位Tickets
                  Go會員限購4張，請務必在活動啟售前24小時完成驗證，售票當天無法保證能驗證成功，24小時之內才驗證手機成功的帳號恕無法確保能順利購票。
                </li>
                <li>進行手機號碼驗證，但收不到簡訊怎麼辦？請點我</li>
                <li>系統會先配好最適座位，可以在規定時間內更改座位</li>
                <li>付款方式：信用卡(VISA/MASTER/JCB)</li>
                <li>
                  為強化信用卡網路付款安全，Tickets Go售票系統網站導入了更安全的信用卡 3D
                  驗證服務，會員購票時，將取得簡訊驗證碼，確保卡號確實為持卡人所有，以提供持卡人更安全的網路交易環境。信用卡3D驗證流程為何？
                </li>
                <li>取票方式：全家取票(手續費每筆$30/4張為限，請於全家便利商店繳納給櫃臺)</li>
                <li>Tickets Go購票流程圖示說明請點我</li>
                <li>全家便利商店FamiPort取票說明請點我</li>
                <li>
                  選擇全家便利商店FamiPort取票請留意：請勿在啟售當天於網站訂購完成後馬上至全家便利商店取票，極有可能因系統繁忙無法馬上取票，只要訂購成功票券在演出前皆可取票，請擇日再至全家便利商店取票。
                </li>
              </ul>
            </li>
            <li>
              全家便利商店FamiPort購票：(優先購不適用)
              <ul className='list-disc pl-6 space-y-2'>
                <li>無需加入會員，每筆訂單限購4張</li>
                <li>
                  系統自動配位，選擇區域後系統將自動配至購買票價的最適區域及座位，且可能與選擇的區域不同，無法自行選區域及座位
                </li>
                <li>付款方式：僅接受現金</li>
                <li>取票方式：付款完畢直接於全家便利商店櫃臺現場取票，免手續費</li>
                <li>全家便利商店店鋪查詢 請點我</li>
                <li>全家便利商店FamiPort購票流程圖示說明 請點我</li>
                <li>
                  於全家便利商店FamiPort列印繳費單後，需在10分鐘內在該店櫃檯完成結帳，若無法在時間內完成結帳取票，訂單將會被取消，原本購買的票券將釋回到系統中重新銷售。
                </li>
                <li>於全家便利商店之購票動作皆於結帳取票後方能保證票券，請注意單憑列印繳費單無法保證其票券。</li>
              </ul>
            </li>
            <li>
              <ul className='list-disc pl-6 space-y-2'>
                身心障礙票券說明：
                <li>僅接受傳真訂購，3/25(一)上午10點起接受身心障礙席傳真訂票作業，張數有限，售完為止。</li>
                <li>
                  每位身心障礙人士含陪同者僅限購2張票券，輪椅席身障票每席400元，非輪椅身障票每席1,300元，敬請下載「Tickets
                  Go購票刷卡單」。
                </li>
              </ul>
            </li>
            <li>輪椅人士：安排於橙207區、橙208區、橙209區 (輪椅席區陪同票須與身心障礙者同席)</li>
            <li>
              非乘坐輪椅人士：安排於橙209區
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  填妥表格後，連同身心障礙證明影本，傳真至(02)2777-3086，Tickets
                  Go不保證傳真成功便絕對能購得票券，訂單成立的順序依照收件順序為主。
                </li>
                <li>表格資料錯誤、缺漏、無法辨識與未傳真身心障礙證明者，不予受理。</li>
                <li>進場時敬請攜帶有效證件，未帶證件、資格不符者、或非本人者需補票價差額始得入場。</li>
                <li>身心障礙者與陪同者須同時憑同一身心障礙證明驗證進場</li>
              </ul>
            </li>
          </ol>
          <h2 id='refundInfo' className='text-2xl font-bold mb-2 mt-8'>
            退票說明<span className='block border-t border-gray-300 mt-2'></span>
          </h2>
          <p className='mb-4'>
            根據文化部訂定『藝文表演票券定型化契約應記載及不得記載事項』第六項「退、換票機制」之規定共有四種方案之退換票規定，本節目採用方案二：消費者請求退換票之時限為購買票券後3日內(不含購票日)，購買票券後第4日起不接受退換票申請，請求退換票日期以郵戳寄送日為準，退票需酌收票面金額5%手續費，範例如下：
          </p>
          <ul className='list-disc pl-6 space-y-2 mb-4'>
            <li>2024/3/22購買，退票截止日為2024/3/25(含)，2024/3/26(含)起的郵戳退票不再受理</li>
            <li>2024/3/23購買，退票截止日為2024/3/26(含)，2024/3/27(含)起的郵戳退票不再受理</li>
          </ul>
          <p className='mb-4'>退票方式及退款時間請詳閱Tickets Go退換票規定。</p>
          <p className='mb-4'>
            According to the second ticket return plan of Laws & Regulations of “Ministry of Culture”, tickets are
            refundable with 5% return handing fee for three days ONLY after you purchase them. For example:
          </p>
          <ul className='list-disc pl-6 space-y-2 mb-4'>
            <li>
              Tickets purchased on 2024/3/22 must be mailed to Tickets Go before 2024/3/25. Tickets mailed out on and
              after 2024/3/26 for refund will NOT be accepted.
            </li>
            <li>
              Tickets purchased on 2024/3/23 must be mailed to Tickets Go before 2024/3/26. Tickets mailed out on and
              after 2024/3/27 for refund will NOT be accepted.
            </li>
          </ul>
          <p className='mb-4'>
            In order to process your refund request, physical tickets must be mailed to Tickets Go before the due date.
            For Tickets Go address, please refer to{' '}
            <a href='https://Tickets Go.com/help/refund' className='text-blue-500 underline'>
              Tickets Go REFUND POLICY
            </a>
            .
          </p>
          <p className='mb-4'>
            NOTE: If you choose Family Mart as ticket collect method, you will still need to pick up your ticket at
            Family Mart and send it to Tickets Go.
          </p>

          <h2 id='notice' className='text-2xl font-bold mb-2 mt-8'>
            注意事項<span className='block border-t border-gray-300 mt-2'></span>
          </h2>
          <ul className='list-disc pl-6 space-y-2 mb-4'>
            <li>
              請勿於拍賣網站或是其他非Tickets
              Go正式授權售票之通路、網站購票、也不要透過陌生代購進行購票，主辦單位與Tickets
              Go均無法保證票券真實性。除可能衍生詐騙案件或交易糾紛外，以免影響自身權益，若發生演出現場無法入場或是其他問題，主辦單位及Tickets
              Go概不負責。
            </li>
            <li>
              若有任何形式非供自用而加價轉售（無論加價名目為代購費、交通費、補貼等均包含在內）之情事者，已違反社會秩序維護法第64條第2款；且依文化創意產業發展法第十條之一第二項規定，將票券超過票面金額或定價販售者，按票券張數，由直轄市政府、縣（市）政府處每張票面金額之十倍至五十倍罰鍰，請勿以身試法。
            </li>
            <li>
              一人一票、憑票入場，票券視同有價證券，請妥善保存，如發生遺失、破損、燒毀或無法辨識等狀況，恕不補發。
            </li>
            <li>
              如遇票券毀損、滅失或遺失，主辦單位將依「藝文表演票券定型化契約應記載及不得記載事項」第七項「票券毀損、滅失及遺失之入場機制：主辦單位應提供消費者票券毀損、滅失及遺失時之入場機制並詳加說明。」之規定辦理，詳情請洽Tickets
              Go客服中心。
            </li>
            <li>請勿攜帶相機、攝影機、DV、錄音機入場，未經主辦單位同意，禁止拍照、錄影、錄音。</li>
            <li>本節目禁止攜帶外食、飲料、任何種類之金屬、玻璃、寶特瓶容器、雷射筆、煙火或任何危險物品。</li>
            <li>
              消費者必須以真實姓名購票及填寫有效個人資訊，協助親友購買票券，應取得該個資所有人同意，一旦以虛假資料購買票券已經涉及刑法第二百十條「偽造私文書罪」：「偽造、變造私文書，足以生損害於公眾或他人者，處五年以下有期徒刑。」
              ；且依文化創意產業發展法第十條之一第三項規定：「以虛偽資料或其他不正方式，利用電腦或其他相關設備購買藝文表演票券，取得訂票或取票憑證者，處三年以下有期徒刑，或科或併科新臺幣三百萬以下罰金。」，主辦單位及Tickets
              Go皆有權利立即取消該消費者訂單，請勿以身試法!
            </li>
            <li>
              高雄巨蛋周邊易塞車，園區停車位有限，請多利用大眾運輸至高雄巨蛋。高雄巨蛋交通資訊請參考連結
              <a href='http://www.k-arena.com.tw/traffic.php' className='text-blue-500 underline'>
                http://www.k-arena.com.tw/traffic.php
              </a>
            </li>
            <li>購票前請詳閱注意事項，一旦購票成功視為同意上述所有活動注意事項。</li>
          </ul>
        </div>
        <div className="bg-gray-04 py-20">
          <div className="container">
            <h2 id='eventTicket' className='text-2xl font-bold mb-2 mt-8'>
              活動票券<span className='block border-t border-gray-300 mt-2'></span>
            </h2>
            <div className='w-full text-left mt-4'>
              <div className='bg-white'>
                <div className='py-2 px-4 grid' style={{ gridTemplateColumns: '600px 200px 150px 150px' }}>
                  <div className='whitespace-nowrap'>場次時間</div>
                  <div className='whitespace-nowrap'>活動地點</div>
                  <div className='whitespace-nowrap'>開始時間</div>
                  <div className='whitespace-nowrap'>結束時間</div>
                </div>
              </div>
              <div className='space-y-2 mt-2'>
                {event.sessions.map((ticket: Session) => (
                  <div key={ticket.sessionId} className='border-b hover:cursor-pointer bg-white' onClick={() => {
                    router.push(`/purchase?eventId=${eventId}&sessionId=${ticket.sessionId}`);
                  }}>
                    <div className='py-2 px-4 grid' style={{ gridTemplateColumns: '600px 200px 150px 150px' }}>
                      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                        {dayjs(+ticket.startDate).format('YYYY/MM/DD(dd) HH:mm(Z)')}
                        </div>
                      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>{ticket.location}</div>
                      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                        {dayjs(+ticket.startTime).format('HH:mm')}
                        </div>
                      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
                        {dayjs(+ticket.endTime).format('HH:mm')}
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default requireAuth(EventPage)
