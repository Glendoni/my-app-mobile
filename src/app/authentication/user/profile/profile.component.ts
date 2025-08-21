import {ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../../_services";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private us: UserService) {
 //this.edit()
    this.modelConstruct([]);
  }
val:any = 'asd'
  model:any = []

  modelConstruct(data: any) {

   this.model = {
      username: {
        type: "text",
        placeholder: 'Example',
        value: 'Glen',
        label: "Choose Username",
        rules: {
          required: true,
        }
      },
      bio: {
        type: "text",
        placeholder: "Example: I am a teacher...",
        value: 'I am' ,
        label: "About Me",
        rules: {
          required: true,
        }
      },
      maxNumber: {
        type: "select",
        value: 3,
        label: "Pause Notifications If I Am Active On More Than [X] Number Of Surveys ",
        rules: {
          required: true,
        },
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
      },
      // surname: {
      //   type: "text",
      //   value: "",
      //   label: "Sur Name"
      // },
      // lastname: {
      //   type: "text",
      //   value: "",
      //   label: "LastName"
      // },
      // address: {
      //   type: "text",
      //   value: "",
      //   label: "Address",
      // },
      // age: {
      //   type: "number",
      //   value: "",
      //   label: "age"
      // },
      // birthDay: {
      //   type: "date",
      //   value: "",
      //   label: "Birthday",
      // },
      gender_group: {
        label: "Gender Group",
        value: "",
        type: "radio",
        options: [
          {
            label: "Male",
            value: 1,
          },
          {
            label: "Female",
            value: 2,
          },
        ],

      },
      age_group: {
        label: "Age Group",
        value: '',
        type: "select",
        options: [
          {
            label: "20-30",
            value: "20-40",
          },
          {
            label: "30-40",
            value: "30-40",
          },
        ],

      },

      // newsletterIn: {
      //   label: "Suscribe to newsletter",
      //   value: "email",
      //   type: "checkbox",
      // },
      // subscriptionType: {
      //   label: "Suscription Type",
      //   value: "premium",
      //   type: "select",
      //   options: [
      //     {
      //       label: "Pick one",
      //       value: "",
      //     },
      //     {
      //       label: "Premium",
      //       value: "premium",
      //     },
      //     {
      //       label: "Basic",
      //       value: "basic",
      //     },
      //   ],
      // },
      country: {
        id: 'country',
        label: "Country",
        value: 'UK',
        type: "select",
        options: [
          {
            label: "United Kingdom",
            value: "UK"
          },
          {
            label: "USA",
            value: "US"
          }
        ],
        provideData: [
          {
            label: 'London',
            sourceValue: 'UK',
            value: 'LND'
          },
          {
            label: 'Scotland',
            sourceValue: 'UK',
            value: 'SCT'
          },
          {
            label: 'Wales',
            sourceValue: 'UK',
            value: 'WLS'
          }, {
            label: 'Northern Ireland',
            sourceValue: 'UK',
            value: 'NI'
          },
          {
            label: 'New York',
            sourceValue: 'US',
            value: 'NYC'
          },
          {
            label: 'Cleveland',
            sourceValue: 'US',
            value: 'E'
          }
        ]
      },
      city: {
        label: "Region",
        type: "select",
        link: 'country',
        value:   '',
        options: [
          {
            label: "Select Country First",
            value: ""
          },
          {
            label: "London",
            value: "LND"
          },

        ]
      },

      ethnicity: {
        id: 'ethnicity',
        label: "Ethnicity",
        type: "select",
        value: "W" ,
        options: [
          {
            label: "White",
            value: "W"
          },
          {
            label: "Black",
            value: "B"
          },
          {
            label: "Asian",
            value: "A"
          },
          {
            label: "European",
            value: "E"
          },
          {
            label: "Latin American",
            value: "LA"
          }
        ],
        provideData: [
          {
            label: 'Black British',
            sourceValue: 'B',
            value: 'B'
          },
          {
            label: 'Black African',
            sourceValue: 'B',
            value: 'BA'
          }, {
            label: 'Afro Caribbean',
            sourceValue: 'B',
            value: 'AC'
          },
          {
            label: 'White Irish',
            sourceValue: 'W',
            value: 'WI'
          },
          {
            label: 'White Mix',
            sourceValue: 'W',
            value: 'WM'
          },
          {
            label: 'New York',
            sourceValue: 'US',
            value: 'NYC'
          },
          {
            label: 'Cleveland',
            sourceValue: 'CLV',
            value: 'E'
          }
        ]
      },
      ethnicity_group: {
        label: "Ethnicity Group",
        type: "select",
        link: 'ethnicity',
        value:  'PNS',
        options: [
          {
            label:  'Select Ethnicity Group First',
            value: 'PNS'
          },

        ]
      }
    };

   // this.model = modelP;
  }
  submit(event:any){

  }
  //
  // edit(){
  //   this.us.getProfile().subscribe((data:any) => {
  //   this.modelConstruct(data.model)
  //
  //    const profile = data
  //
  //    // console.log(profile[0].id)
  //   })
  //
  //
  //
  //
  // }
}
