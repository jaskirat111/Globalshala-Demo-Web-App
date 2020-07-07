# Globalshala-Demo-Web-App
Globalshala is a rising platform for connecting students and Universities by providing admission to students in their dream universities. Our aim is to improve easiness of opportunities for students and Universities. We focus on quality of Students, practical approach and authenticity of procedure. To improve easiness of opportunities for students, encouraging Admission and enhancing their skills is our main aim.

# Our Mission
Our platform connects students and Universities by providing admission to students. We assure quality of students with our task oriented approach. Students are verified of their skills using our online tests. Build your resume with our progressing tasks and increase your skills required by Universities.

# Our Vision
We have a broad vision of improving a student’s career while taking care of job market pool. Our vision is to motivate students to take active steps towards their career with our digital help. We want efficient students to rise up and improve coming society with their skills and work.

# Team Name : Code UI

## Local Installation
It's easy to install and run it on your computer.

### Install Nodejs in your environment -> https://nodejs.org/en/download/ 

```shell
# 1. First, clone the repo
$ git clone https://github.com/jaskirat111/Globalshala-Demo-Web-App
$ cd Globalshala-Demo-Web-App

# 2. Install npm packages
$ npm install

# 3. Run!
$ npm start
```
Open http://localhost:3000 and have fun. :smiley:

## Other Requirements (Theses requirements are already fulfilled in the code):

#### 1. Go to misc-> mailer.js and routes-> forgots.js . Update the user and pass values with your email Id and password (gmail is preferred). 
```shell
const transport = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "type your gmail Id",
      pass: "type your password",
    },
  })
);
```
#### 2. change your settings at https://www.google.com/settings/security/lesssecureapps so that your gmail account is no longer protected by modern security standards. In addition to enabling Allow less secure apps, you might also need to navigate to https://accounts.google.com/DisplayUnlockCaptcha and click continue.

#### 3. Go to routes -> user.js and update the apikey and apisecret values for Nexmo SMS API. Apply for a free trial for nexmo SMS service in https://developer.nexmo.com/ and copy the apikey and apisecret into the code.

```shell
const nexmo = new Nexmo({
  apiKey: "XXXXX",
  apiSecret: "XXXXXXX",
});
```

#### 4. Apply for Instamojo payment gateway services in https://www.instamojo.com/ (Bank Details are required for free trial) and copy the instamojo testing keys in routes-> bid.js

```shell
Insta.setKeys('XXXXXXXXXXXXXXXXXXXXX', 'XXXXXXXXXXXXXXX');
```







