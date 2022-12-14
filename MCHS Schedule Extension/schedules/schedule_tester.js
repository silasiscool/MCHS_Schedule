const config = {
  "day_schedule" : [
    {"date" : "9/14/2022", "schedule" : "black_ER"},
    {"date" : "9/30/2022", "schedule": "black_pep_rally_2022"},
    {"date" : "10/6/2022", "schedule" : "ado"},
    {"date" : "10/7/2022", "schedule" : "no_school_other"},
    {"date" : "10/10/2022", "schedule" : "holiday", "alt_name" : "Indigenous Peoples Day"},
    {"date" : "10/14/2022", "schedule" : "10/14/2022"},
    {"date" : "11/10/2022", "schedule" : "teen_issues_ER"},
    {"date" : "11/11/2022", "schedule" : "holiday", "alt_name" : "Vetrans Day"},
    {"date" : "11/23/2022", "schedule" : "no_school_other"},
    {"date" : "11/24/2022", "schedule" : "holiday", "alt_name" : "Thanksgiving"},
    {"date" : "11/25/2022", "schedule" : "vacation"},
    {"date" : "12/1/2022", "schedule" : "gold_normal"},
    {"date" : "12/2/2022", "schedule" : "black_normal"},
    {"date" : "12/15/2022", "schedule" : "teen_issues"},
    {"date" : "12/22/2022", "schedule" : "black_ER"},
    {"date" : "12/23/2022", "schedule" : "vacation"},
    {"date" : "1/1/2023", "schedule" : "holiday", "alt_name" : "New Year's Day"},
    {"date" : "1/13/2023", "schedule" : "gold_ER"},
    {"date" : "1/16/2023", "schedule" : "holiday", "alt_name" : "MLK Jr. Day"},
    {"date" : "2/13/2023", "schedule" : "gold_ER"},
    {"date" : "2/20/2023", "schedule" : "holiday", "alt_name" : "Presidents' Day"},
    {"date" : "3/10/2023", "schedule" : "winter_carnival"},
    {"date" : "3/17/2023", "schedule" : "no_school_other"},
    {"date" : "4/14/2023", "schedule" : "no_school_other"},
    {"date" : "4/17/2023", "schedule" : "holiday", "alt_name" : "Patriots' Day"},
    {"date" : "5/10/2023", "schedule" : "gold_ER"},
    {"date" : "5/29/2023", "schedule" : "holiday", "alt_name" : "Memorial Day"},
    {"date" : "6/7/2023", "schedule" : "ado"}
  ],
  "day_types" : [
    {
      "name" : "black_normal",
      "display_name" : "Black Day - Normal",
      "color" : "#000000",
      "text_color" : "#ffffff",
      "tag" : "",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:16"},
        {"name" : "B1", "time" : "8:20"},
        {"name" : "Transition", "time" : "9:32"},
        {"name" : "B2", "time" : "9:36"},
        {"name" : "Transition", "time" : "10:48"},
        {"name" : "Lunch A/Advisee A", "time" : "10:52"},
        {"name" : "Transition/Advisee A", "time" : "11:18"},
        {"name" : "Advisee", "time" : "11:21"},
        {"name" : "Advisee B/Transition", "time" : "11:24"},
        {"name" : "Advisee B/Lunch B", "time" : "11:27"},
        {"name" : "Transition", "time" : "11:53"},
        {"name" : "B3", "time" : "11:57"},
        {"name" : "Transition", "time" : "13:09"},
        {"name" : "B4", "time" : "13:13"},
        {"name" : "Bus Dissmissal", "time" : "14:24"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "gold_normal",
      "display_name" : "Gold Day - Normal",
      "color" : "#F5C242",
      "text_color" : "#000000",
      "tag" : "",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:16"},
        {"name" : "G5", "time" : "8:20"},
        {"name" : "Transition", "time" : "9:32"},
        {"name" : "G6", "time" : "9:36"},
        {"name" : "Transition", "time" : "10:48"},
        {"name" : "Lunch A/Advisee A", "time" : "10:52"},
        {"name" : "Transition/Advisee A", "time" : "11:18"},
        {"name" : "Advisee", "time" : "11:21"},
        {"name" : "Advisee B/Transition", "time" : "11:24"},
        {"name" : "Advisee B/Lunch B", "time" : "11:27"},
        {"name" : "Transition", "time" : "11:53"},
        {"name" : "G7", "time" : "11:57"},
        {"name" : "Transition", "time" : "13:09"},
        {"name" : "G8", "time" : "13:13"},
        {"name" : "Bus Dissmissal", "time" : "14:24"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "black_ER",
      "display_name" : "Black Day - Early Release",
      "color" : "#000000",
      "text_color" : "#ffffff",
      "tag" : "ER",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:05"},
        {"name" : "B1", "time" : "8:09"},
        {"name" : "Transition", "time" : "8:41"},
        {"name" : "B2", "time" : "8:45"},
        {"name" : "Transition", "time" : "9:17"},
        {"name" : "B3", "time" : "9:21"},
        {"name" : "Transition", "time" : "9:53"},
        {"name" : "B4", "time" : "9:57"},
        {"name" : "Transition", "time" : "10:29"},
        {"name" : "Lunch A/Advisee A", "time" : "10:33"},
        {"name" : "Transition/Advisee A", "time" : "10:58"},
        {"name" : "Advisee", "time" : "11:01"},
        {"name" : "Advisee B/Transition", "time" : "11:03"},
        {"name" : "Advisee B/Lunch B", "time" : "11:06"},
        {"name" : "Free", "time" : "11:31"}
      ]
    },
    {
      "name" : "gold_ER",
      "display_name" : "Gold Day - Early Release",
      "color" : "#F5C242",
      "text_color" : "#000000",
      "tag" : "ER",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:05"},
        {"name" : "G5", "time" : "8:09"},
        {"name" : "Transition", "time" : "8:41"},
        {"name" : "G6", "time" : "8:45"},
        {"name" : "Transition", "time" : "9:17"},
        {"name" : "G7", "time" : "9:21"},
        {"name" : "Transition", "time" : "9:53"},
        {"name" : "G8", "time" : "9:57"},
        {"name" : "Transition", "time" : "10:29"},
        {"name" : "Lunch A/Advisee A", "time" : "10:33"},
        {"name" : "Transition/Advisee A", "time" : "10:58"},
        {"name" : "Advisee", "time" : "11:01"},
        {"name" : "Advisee B/Transition", "time" : "11:03"},
        {"name" : "Advisee B/Lunch B", "time" : "11:06"},
        {"name" : "Free", "time" : "11:31"}
      ]
    },
    {
      "name" : "weekend",
      "display_name" : "Weekend",
      "color" : "#A6A6A6",
      "text_color" : "#000000",
      "tag" : "",
      "schedule" : []
    },
    {
      "name" : "vacation",
      "display_name" : "Vacation",
      "color" : "#A6A6A6",
      "text_color" : "#000000",
      "tag" : "V",
      "schedule" : []
    },
    {
      "name" : "holiday",
      "display_name" : "Holiday",
      "color" : "#A6A6A6",
      "text_color" : "#000000",
      "tag" : "H",
      "schedule" : []
    },
    {
      "name" : "no_school_other",
      "display_name" : "No School",
      "color" : "#A6A6A6",
      "text_color" : "#000000",
      "tag" : "",
      "schedule" : []
    },
    {
      "name" : "ado",
      "display_name" : "Advisee Day Out - Normal",
      "color" : "#78A65A",
      "text_color" : "#000000",
      "tag" : "A",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "teen_issues",
      "display_name" : "Teen Issues - Normal",
      "color" : "#8C1AF5",
      "text_color" : "#ffffff",
      "tag" : "",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Teen Issues", "time" : "8:00"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "teen_issues_ER",
      "display_name" : "Teen Issues - Early Release",
      "color" : "#8C1AF5",
      "text_color" : "#ffffff",
      "tag" : "ER",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Teen Issues", "time" : "8:00"},
        {"name" : "Free", "time" : "11:31"}
      ]
    },
    {
      "name" : "winter_carnival",
      "display_name" : "Winter Carnival - Normal",
      "color" : "#BB271A",
      "text_color" : "#ffffff",
      "tag" : "C",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Winter Carnival", "time" : "8:00"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "black_pep_rally_2022",
      "display_name" : "Black Day - Pep Rally",
      "color" : "#000000",
      "text_color" : "#ffffff",
      "tag" : "",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:11"},
        {"name" : "B1", "time" : "8:15"},
        {"name" : "Transition", "time" : "9:06"},
        {"name" : "B2", "time" : "9:10"},
        {"name" : "Transition", "time" : "10:01"},
        {"name" : "B3", "time" : "10:05"},
        {"name" : "Transition", "time" : "10:56"},
        {"name" : "A Lunch/Advisee A", "time" : "11:00"},
        {"name" : "Transition/Advisee A", "time" : "11:26"},
        {"name" : "Advisee", "time" : "11:29"},
        {"name" : "Advisee B/Transiton", "time" : "11:32"},
        {"name" : "Advisee B/Lunch B", "time" : "11:35"},
        {"name" : "Transiton", "time" : "12:01"},
        {"name" : "B4", "time" : "12:05"},
        {"name" : "Transiton", "time" : "13:01"},
        {"name" : "Pep Rally", "time" : "13:03"},
        {"name" : "Return to advisor", "time" : "14:10"},
        {"name" : "Bus Dissmissal", "time" : "14:24"},
        {"name" : "Free", "time" : "14:30"}
      ]
    },
    {
      "name" : "10/14/2022",
      "display_name" : "Gold Day - Normal",
      "color" : "#F5C242",
      "text_color" : "#000000",
      "tag" : "",
      "schedule" : [
        {"name" : "Transition", "time" : "7:55"},
        {"name" : "Advisee", "time" : "8:00"},
        {"name" : "Transition", "time" : "8:16"},
        {"name" : "G5", "time" : "8:20"},
        {"name" : "Transition", "time" : "9:32"},
        {"name" : "G6", "time" : "9:36"},
        {"name" : "Transition", "time" : "10:48"},
        {"name" : "Lunch A/Advisee A", "time" : "10:52"},
        {"name" : "Transition/Advisee A", "time" : "11:18"},
        {"name" : "Advisee", "time" : "11:21"},
        {"name" : "Advisee B/Transition", "time" : "11:24"},
        {"name" : "Advisee B/Lunch B", "time" : "11:27"},
        {"name" : "Transition", "time" : "11:53"},
        {"name" : "G7", "time" : "11:57"},
        {"name" : "Transition", "time" : "13:09"},
        {"name" : "G8", "time" : "13:13"},
        {"name" : "Free", "time" : "13:45"}
      ]
    }
  ],
  "week_schedule" : [
    {"monday_date" : "9/12/2022", "schedule": "black_week"},
    {"monday_date" : "9/19/2022", "schedule": "gold_week"},
    {"monday_date" : "9/26/2022", "schedule": "black_week"},
    {"monday_date" : "10/3/2022", "schedule": "gold_week"},
    {"monday_date" : "10/10/2022", "schedule": "gold_week"},
    {"monday_date" : "10/17/2022", "schedule": "black_week"},
    {"monday_date" : "10/24/2022", "schedule": "gold_week"},
    {"monday_date" : "10/31/2022", "schedule": "black_week"},
    {"monday_date" : "11/7/2022", "schedule": "gold_week"},
    {"monday_date" : "11/14/2022", "schedule": "black_week"},
    {"monday_date" : "11/21/2022", "schedule": "gold_week"},
    {"monday_date" : "11/28/2022", "schedule": "gold_week"},
    {"monday_date" : "12/5/2022", "schedule": "gold_week"},
    {"monday_date" : "12/12/2022", "schedule": "black_week"},
    {"monday_date" : "12/19/2022", "schedule": "gold_week"},
    {"monday_date" : "12/26/2022", "schedule": "vacation_week"},
    {"monday_date" : "1/2/2023", "schedule": "black_week"},
    {"monday_date" : "1/9/2023", "schedule": "gold_week"},
    {"monday_date" : "1/16/2023", "schedule": "gold_week"},
    {"monday_date" : "1/23/2023", "schedule": "black_week"},
    {"monday_date" : "1/30/2023", "schedule": "gold_week"},
    {"monday_date" : "2/6/2023", "schedule": "black_week"},
    {"monday_date" : "2/13/2023", "schedule": "gold_week"},
    {"monday_date" : "2/20/2023", "schedule": "vacation_week"},
    {"monday_date" : "2/27/2023", "schedule": "black_week"},
    {"monday_date" : "3/6/2023", "schedule": "gold_week"},
    {"monday_date" : "3/13/2023", "schedule": "black_week"},
    {"monday_date" : "3/20/2023", "schedule": "black_week"},
    {"monday_date" : "3/27/2023", "schedule": "gold_week"},
    {"monday_date" : "4/3/2023", "schedule": "black_week"},
    {"monday_date" : "4/10/2023", "schedule": "gold_week"},
    {"monday_date" : "4/17/2023", "schedule": "vacation_week"},
    {"monday_date" : "4/24/2023", "schedule": "gold_week"},
    {"monday_date" : "5/1/2023", "schedule": "black_week"},
    {"monday_date" : "5/8/2023", "schedule": "gold_week"},
    {"monday_date" : "5/15/2023", "schedule": "black_week"},
    {"monday_date" : "5/22/2023", "schedule": "gold_week"},
    {"monday_date" : "5/29/2023", "schedule": "gold_week"},
    {"monday_date" : "6/5/2023", "schedule": "black_week"},
    {"monday_date" : "6/12/2023", "schedule": "gold_week"}
  ],
  "week_types" : [
    {
      "name": "black_week",
      "schedule" : [
        "weekend",
        "black_normal",
        "gold_normal",
        "black_normal",
        "gold_normal",
        "black_normal",
        "weekend"
      ]
    },
    {
      "name": "gold_week",
      "schedule" : [
        "weekend",
        "gold_normal",
        "black_normal",
        "gold_normal",
        "black_normal",
        "gold_normal",
        "weekend"
      ]
    },
    {
      "name": "vacation_week",
      "schedule" : [
        "vacation",
        "vacation",
        "vacation",
        "vacation",
        "vacation",
        "vacation",
        "vacation"
      ]
    }
  ],
  "nameable_classes" : [
    "B1",
    "B2",
    "B3",
    "B4",
    "G5",
    "G6",
    "G7",
    "G8"
  ]
}









// Test day_schedule
config.day_schedule.forEach((item, i) => {
  if (config.day_types.findIndex((object) => object.name == item.schedule)=== -1) {
    console.log('ERROR: day_schedule: invalid day type: ', item)
  }
});

// Test day_types

// Test week_schedule
config.week_schedule.forEach((item, i) => {
  if (new Date(item.monday_date).getDay() !== 1) {
    console.log('ERROR: week_schedule: invalid date: ', item)
  }
  if (config.week_types.findIndex((object) => object.name == item.schedule) === -1) {
    console.log('ERROR: week_schedule: invalid week type: ', item)
  }
})

// Test week_types


// Finished
console.log('Rewiew Finished');
