const response = require("../response");
const schedule = require("node-schedule");
const moment = require("moment");
const knex = require("../../knex");

const UserModel = require("../../models/UserModel");

var { sendNotification } = require("../notification/index");

exports.start_schedule = async () => {
  schedule.scheduleJob("0 1-10 * * *", () => scan_form());
};

async function scan_form() {
  try {
    // noti to frontMT
    const list_mt = await getListExpire("mt");
    if (list_mt.length > 0) {
      const front_mt_token = await UserModel.getNotiTokenByRole("frontMT");
      const front_mt_notification = {
        title: "แจ้งเตือนความล่าช้า",
        body: `มีรายการที่ยังไม่ได้รับการยืนยันอยู่ ${list_mt.length} รายการ`
      };
      await sendNotification(front_mt_notification, front_mt_token);
    }

    // noti to frontPT
    const list_pt = await getListExpire("pt");
    if (list_pt.length > 0) {
      const front_pt_token = await UserModel.getNotiTokenByRole("frontPT");
      const front_pt_notification = {
        title: "แจ้งเตือนความล่าช้า",
        body: `มีรายการที่ยังไม่ได้รับการยืนยันอยู่ ${list_pt.length} รายการ`
      };
      await sendNotification(front_pt_notification, front_pt_token);
    }

    // noti to user
    const list = await getListExpire();
    list.forEach(async el => {
      let user_token = await UserModel.getNotiToken(el.customer);
      let user_notification = {
        title: "แจ้งเตือนความล่าช้า",
        body: `รายการหมายเลข ${el.ln} ของท่านยังไม่ได้รับการยืนยัน กรุณาติดต่อเจ้าหน้าที่`
      };
      await sendNotification(user_notification, user_token);
    });
  } catch (err) {
    response.failed(res, err, "ผิดพลาด");
  }
}

function getListExpire(type) {
  const expire = moment().format("YYYY-MM-DD");
  const expire1 = moment()
    .add(1, "day")
    .format("YYYY-MM-DD");
  return knex("list_table")
    .where(type ? { type, service_status: 1 } : { service_status: 1 })
    .where("service_at", ">=", expire)
    .where("service_at", "<", expire1);
}
