let express = require("express"),
  path = require("path"),
  nodeMailer = require("nodemailer"),
  bodyParser = require("body-parser");

let app = express();

app.use(express.static("src"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const csvFilePath = "https://srv-store6.gofile.io/download/MsOBqf/sample.csv";
// const csv = require("csvtojson");
// csv()
//   .fromFile(csvFilePath)
//   .then((jsonObj) => {
//     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
//     console.log(jsonObj);
//     console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
//   });


const sendEmail = (user, fromAcc) => {
  
  
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // should be replaced with real sender's account
      user: fromAcc,
      pass: "Vr360@1234"
    }
  });
  let mailOptions = {
    // should be replaced with real recipient's account
    // to: "Tania@thinkubatorx.com",
    to: user['Email Address'].toLowerCase(),
    subject: 'Gulf News EDUFAIR - Login details',
    html: `
    <p><b>Dear ${user['First Name']} ${user['Last Name']}</b>,</p>
    
    <p>We hope you are well.</p>
    
    <p>We would like to extend our sincerest apologies for the inconvenience you’ve had to face to log onto our virtual event yesterday. </p>
    
    <p>We do our best every day to ensure that our guests enjoy the best virtual event experiences. We know that we have let you down, and for that we are truly sorry and assure you that this situation will not repeat itself. </p>
    
    <p><b>You can use this link to log in:</b></p>
    
    ${user['Address']}
    
    <br><br><br>
    
    <p>The Gulf News EduFair has two more days to go and we hope to see you there and offer you all the support you need to make the right career choices. <br>
    Here’s what’s lined up for today!</p>
    
    <br>
    
    <p style="text-align: center;">
    <h2 style="text-align: center; margin-bottom: 3px;"><b>12:30pm – 1:30pm</b></h2>
    <div style="text-align: center; font-weight: bold; margin-bottom: 3px;">Webinar</div>
    <div style="text-align: center; font-size: 16px;">Closing the skill gap: A pathway to employability</div>
    </p>
    
    <p style="text-align: center;">
    <h2 style="text-align: center; margin-bottom: 3px;"><b>2:30pm – 3:30pm</b></h2>
    <div style="text-align: center; font-weight: bold; margin-bottom: 3px;">Webinar</div>
    <div style="text-align: center; font-size: 16px;">Stay stylish on a student budget</div>
    </p>
    
    <p style="text-align: center;">
    <h2 style="text-align: center; margin-bottom: 3px;"><b>4:30pm – 5pm</b></h2>
    <div style="text-align: center; font-size: 16px;">Session by British Council</div>
    </p>
    
    <br>

    <p>With so many stellar universities showcasing a wide array of courses, interactive career counselling sessions, admission essentials, scholarships and guidance on tests, the Gulf News EduFair is the right place to advance your career.</p>
    
    <p>We look forward to welcoming you today.</p>
    
    <br>

    <p>Warm regards,
    <br>
    Team EduFair</p>
    
    
    `
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error --------> ',user['Email Address'], error);
    }
    console.log("Email to: %s --- Message %s sent: %s", user['Email Address'], info.messageId, info.response);
  });
}

app.post("/send-email", function (req, res) {
  
  
// const csvFilePath = "https://srv-store6.gofile.io/download/MsOBqf/sample.csv";
const csvFilePath = "./orginal.csv";
const csv = require("csvtojson");
csv()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(jsonObj);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%");
    
  const accounts = ['gnedufair3@360xglobal.com',
  'gnedufair2@360xglobal.com',
  'gnedufair5@360xglobal.com',
  'gnedufair4@360xglobal.com',
  'gnedufair1@360xglobal.com']
    
    
    jsonObj.map((u, idx) => {
      if (u['Email Address']) {
        // sendEmail(u)
        
        const useAccIdx = idx % accounts.length;
        
        const acc = accounts[useAccIdx];
        
        if (idx <= 250) { // 1st batch
          
          setTimeout(() => {
            console.log(`@@@ BATCH - 1 @@@ send to: ${u['Email Address']}; @@@ from: ${acc}`);
            sendEmail(u, acc);
          }, 200);
          
          
        } else if (idx > 250 && idx <= 500) { // 2nd batch
          
          setTimeout(() => {
            
            setTimeout(() => {
              console.log(`@@@@ BATCH - 2 @@@@ send to: ${u['Email Address']}; @@@ from: ${acc}`);
              sendEmail(u, acc);
            }, 100);
            
          }, 2 * 60 * 60 * 1000); // after 2 hrs
          

        } else { // final batch
          
          setTimeout(() => {
            
            setTimeout(() => {
              console.log(`@@@@ BATCH - 3 @@@@ send to: ${u['Email Address']}; @@@ from: ${acc}`);
              sendEmail(u, acc);
            }, 100);
            
          }, 4 * 60 * 60 * 1000); // after 4hrs

        }
        
      }
    })
    
    
  res.json({});
  res.end();
  });
  
  

  
  // let transporter = nodeMailer.createTransport({
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     // should be replaced with real sender's account
  //     user: "gnedufair5@360xglobal.com",
  //     pass: "Vr360@1234"
  //   }
  // });
  // let mailOptions = {
  //   // should be replaced with real recipient's account
  //   to: "Tania@thinkubatorx.com",
  //   subject: req.body.subject,
  //   body: req.body.message
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Message %s sent: %s", info.messageId, info.response);
  // });
  // res.writeHead(301, { Location: "index.html" });
  // res.end();
  
});

let server = app.listen(8081, function () {
  let port = server.address().port;
  console.log("Server started at http://localhost:%s", port);
});
