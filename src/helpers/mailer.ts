import nodemailer from 'nodemailer';
import mailGun from 'nodemailer-mailgun-transport';
import ejs from 'ejs';
import dotenv from 'dotenv';
dotenv.config();
import Config from '../config/constants';

const transporter = nodemailer.createTransport(mailGun({
  auth: {
    api_key: Config.mail.api_key,
    domain: Config.mail.domain,
  }
}));

interface Options {
  from?: { name: string; address: string };
  to: string;
  subject: string;
  html: string;
}


const mailer = async function (email:string, subject:string, dataSet: any, templateName: string) {
    let emailData:any = {};
    emailData.data = dataSet;
    ejs.renderFile(`${__root}/views/emails/${templateName}.ejs`, emailData, (err, data) => {
      if (!err) {
        const mailOptions: Options = {
          from: { name: Config.mail.sender, address: Config.mail.address },
          to: `${email}`,
          subject: `${subject}`,
          html: data
        };
       
        transporter.sendMail(mailOptions,  (error, info) => {
          console.log(info);
          if (error) {
            console.log(error)
            throw Error('An Error Occured');
          }else{
              console.log('Email sent')
            return 'Email sent'
          }
        });
      } else {
        console.log(err)
        throw Error('An Error Occured');
      }
  
    });
};

export default mailer;