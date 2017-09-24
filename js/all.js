moment().format();

var app = new Vue({
      el: '#app',
      data: {
        options: [
          { text: '--請選擇地區--', value: 'TW', id: 1668284 },
          { text: '台灣', value: 'TW2', id: 7280291 },
          { text: '東京', value: 'JP', id: 1850147 },
          { text: '南韓', value: 'KR', id: 1835841 },
          { text: '泰國', value: 'TH', id: 1605651 },
          { text: '菲律賓', value: 'PH', id: 1694008 },
          { text: '香港', value: 'HK', id: 1819729 },
          { text: '馬來西亞', value: 'MY', id: 1733045 },
          { text: '新加坡', value: 'SG', id: 1880251},
          { text: '胡志明市', value: 'VN', id: 1566083 },
          { text: '平壤', value: 'KP', id: 1871859 },
          { text: '北京', value: 'CN', id: 1816670 },
          { text: '柏林', value: 'DE', id: 2950159 },
          { text: '巴西', value: 'BR', id: 3469034 },
          { text: '開羅', value: 'EG', id: 360630 },
          { text: '剛果', value: 'CG', id: 2260494 },
          { text: '古巴', value: 'CU', id: 3562981 },
          { text: '芬蘭', value: 'FI', id: 660013 },
          { text: '印度', value: 'IN', id: 1269750 },
          { text: '義大利', value: 'IT', id: 3175395 },
          { text: '肯亞', value: 'KE', id: 192950 },
          { text: '里斯本', value: 'PT', id: 6458923 },
          { text: '倫敦', value: 'GB', id: 2643744 },
          { text: '墨西哥', value: 'MX', id: 3996063 },
          { text: '荷蘭', value: 'NL', id: 2750405 },
          { text: '紐約', value: 'US', id: 5128638 },
          { text: '紐西蘭', value: 'NZ', id: 2186224 },
          { text: '巴黎', value: 'FR', id: 2988506 },
          { text: '俄羅斯', value: 'RU', id: 2017370},
          { text: '阿拉伯', value: 'AB', id: 102358},
          { text: '南非', value: 'ZA', id: 953987},
          { text: '西班牙', value: 'ES', id: 2510769},
          { text: '瑞典', value: 'SE', id: 2661886},
          { text: '雪梨', value: 'AU', id: 2147714 },
          { text: '多倫多', value: 'CA', id: 6167865 },
          { text: '烏克蘭', value: 'UA', id: 690791 },
          { text: '北極', value: 'NA', id: 5886735 },
          { text: '南極', value: 'SA', id: 6255152 },
        ],
        selected: 'TW',
        idNum: '',
        rows: [],
        dates: [],
        d: [],
        today: [],
        Day1: [],
        Day2: [],
        Day3: [],
        Day4: [],
        Day5: [],
        Day6: []
      },
      created() {
        console.log(this.getLocalTime(1505325600));
        this.getAjax();
        this.getDate();
      },
      filters: {
        filterA: function (value) {
          if (!value) return '';
          value = parseInt(value);
          return value;
        },
        filterB: function (value) {
          if (!value) return '';
          let dayNow = value.split(' ');
          return dayNow[1];
        },
      },
      methods: {
        getLocalTime: nS => {
          const date = new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
          return date;
        },
        getAjax: function () {
          var self = this;
          for(let i = 0; i < self.options.length; i++) {
            console.log(self.selected);
            if(self.selected == self.options[i].value) {
              self.idNum = self.options[i].id;
            }
          }

          axios({
            method:'get',
            url:'http://api.openweathermap.org/data/2.5/forecast',
            params: {
              id: self.idNum || self.options[0].id,
              APPID: '98b3cf96bb8b9a3ad895135ad82fdab5',
              lang: 'zh_tw'
            },
          })
            .then(function (response) {
                /* 成功拿到資料，然後... */
                const apiData = JSON.parse(response.request.responseText);
                self.rows = apiData.list;
                console.log(self.rows);
                
                const dt = (+new Date());
                const timeStamp = Math.floor(dt / 1000);
                //const startDate = startDate - (startDate % 86400);
                //console.log(startDate);
                console.log(apiData.list.length);
                for(let i = 0; i < apiData.list.length; i++) {

                  self.d.push(moment.unix(apiData.list[i].dt));
                }
                for(let i = 0; i < apiData.list.length; i++) {
                  self.today.push(apiData.list[i].dt_txt.split(' '));
                  //console.log(self.today[i][0]);
                  if(moment().format("YYYY-MM-DD") > self.today[i][0]){
                    self.Day1.push(apiData.list[i]);
                  }
                  if(moment().format("YYYY-MM-DD") == self.today[i][0]){
                    self.Day2.push(apiData.list[i]);
                  }
                  if(moment().add(1, 'd').format("YYYY-MM-DD") == self.today[i][0]){
                    self.Day3.push(apiData.list[i]);
                  }
                  if(moment().add(2, 'd').format("YYYY-MM-DD") == self.today[i][0]){
                    self.Day4.push(apiData.list[i]);
                  }
                  if(moment().add(3, 'd').format("YYYY-MM-DD") == self.today[i][0]){
                    self.Day5.push(apiData.list[i]);
                  }
                  if(moment().add(4, 'd').format("YYYY-MM-DD") == self.today[i][0]){
                    self.Day6.push(apiData.list[i]);
                  }

                }
                /*console.log(self.today[0][0]);
                console.log(self.Day1);
                console.log(self.Day2);
                console.log(self.Day3);
                console.log(self.Day4);
                console.log(self.Day5);
                console.log(self.Day6);*/


                })
              .catch(function (error) {
                /* 失敗，發生錯誤，然後...*/
              });
            },
            getDate: function () {
              let now = new Date();
              let mouth = now.getMonth();
              let today = now.getDate();
              //console.log(mouth + 1);
              //console.log(today);
              let todayDate = {};
              todayDate.date = {
                mouth: 0,
                day: 0
              };
              todayDate.date.mouth = `${mouth + 1}`;
              todayDate.date.day = today;
              //console.log(todayDate);
              this.dates.push(todayDate);
              //console.log(this.dates);
            },
            onChange: function() {
              let self = this;
              self.Day1 = [];
              self.Day2 = [];
              self.Day3 = [];
              self.Day4 = [];
              self.Day5 = [];
              self.Day6 = [];
              console.log(self.selected);
              this.getAjax();
              console.log(self.selected);
              //if(true){
                //console.log(self.options[2].url);
                //self.selected = 'http://api.openweathermap.org/data/2.5/forecast?APPID=98b3cf96bb8b9a3ad895135ad82fdab5&id=2510769';
              //}
              
            }

        }
      });