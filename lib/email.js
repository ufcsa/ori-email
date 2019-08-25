'use strict';

const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const fs = require('fs');
const PATH = require('path');

const writeStream = fs.createWriteStream('../error.csv');

writeStream.write('\ufeff');
const transporter = nodemailer.createTransport({
  pool: true,
  maxConnections: 3,
  rateDelta: 2000,
  socketTimeout: 10000,
  rateLimit: 1,
  service: 'Gmail',
  auth: {
    user: 'ufcsainfo@gmail.com',
    type: 'OAuth2',
    clientId: '441318199090-7jalm990tn71su0kj4jv1m2t4as30mar.apps.googleusercontent.com',
    clientSecret: 'qMR_YFpHm1oclArMgR2vJY5e',
    refreshToken: '1/6YD8uUi2O7N_D1XnZuScDoPMHfzXKYbMihz6OqfzH14',
    accessToken: 'ya29.GltvB8K_LLqdEWKHSjXcGWbeLdebWSQtgGJcM5ZWnIFyZ9I1MRNHYLQS_PfnsE-d839HwTj90fyzZ1GHkroOxPEIKn87AGWz8FYIih5PAGF-mn17ccqjkfnAcnui'
  }
});



// var generator = xoauth2.createXOAuth2Generator(transporter.auth);
// generator.on('token', token => console.log(`new token ${token}`));


const inputArr = fs.readFileSync(PATH.resolve(__dirname, '../temp.csv'), 'utf-8').split('\n');

for(let i = 0; i < inputArr.length; i++) {
  const arr = inputArr[i].split(',');
  const name = arr[0];
  const tableNo = arr[1];
  const email = arr[2];

  const mailOptions = {
    from: '"UF CSA" <ufcsainfo@gmail.com>',
    to: email,
    subject: 'UF CSA New Student Orientation',
    text: `${name} 同学，
  
欢迎参加2019CSA新生见面会！

你的桌号是${tableNo}。请于8月25日（明天）下午5：30到场并排队签到，活动将在6点开始。活动地点是Reitz Union Grand Ballroom，位于Food Court上层。如有任何问题，请在新生群里联系CSA成员。

CSA全体成员`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      writeStream.write([name, tableNo, email].join() + '\n');
    } else {
      console.log(info);
    }
  });
}

// inputArr.forEach(record => {
//   const arr = record.split(',');
//   const name = arr[0];
//   const tableNo = arr[1];
//   const email = arr[2];

//   const mailOptions = {
//     from: '"UF CSA" <ufcsainfo@gmail.com>',
//     to: email,
//     subject: 'UF CSA New Student Orientation',
//     text: `${name} 同学，
  
// 欢迎参加2019CSA新生见面会！

// 你的桌号是${tableNo}。请于8月25日（明天）下午5：30到场并排队签到，活动将在6点开始。活动地点是Reitz Union Grand Ballroom，位于Food Court上层。如有任何问题，请在新生群里联系CSA成员。

// CSA全体成员`
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   })
// });
