function doGet(e) {
  
  
  //Developer     : Parveen Kumar
  //Website       : www.kgsoftwares.com
  //Email         : info@kgsoftwares.com
  //Distributable : No
  
  createBookingEvent(e.parameter);
  
  /*var result = {
    e_id: e_id
  };
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
    */
  
}

function createBookingEvent(data){
  Logger.log("Data: " + data.Calendar_ID);
  
  supercreapDetails = "";
  ozDetails = "";
  
  var calendar = CalendarApp.getCalendarById(data.Calendar_ID);
  
  
  var sDate = new Date(data.sDate);
  var eDate = new Date(data.eDate);
  
  checkAndDeleteEvent(calendar, sDate, eDate, data.Job_ID);
  
  if(data.create_new && data.create_new == true)
  {
  
    var Client_Name = data.Client_Name; 
    var Pickup_Address = data.Pick_up_Address; 
    var Drop_Off_Address = data.Drop_Off_Address; 
    var Additional_Pick_Up = data.Additional_pick; 
    var Contact_Number = data.Client_Phone_Number; 
    var Job_Date = data.Job_Date; 
    var Job_Time = data.Job_Time; 
    var Driver_Instructions = data.Driver_Instructions;
    var Job_ID = data.Job_ID;
    var Price = data.Price;
    
    var booking_url = data.booking_url;
  
    if(data.Booking_Type && data.Booking_Type == "OZ"){
      var Truck_Type = data.Truck_Type;
      var Customer_instructions = data.Customer_Instructions;
      
      ozDetails += '\r Truck Type : ' + Truck_Type;
      ozDetails += '\r Customer Instructions : ' + Customer_instructions;
    }
    if(data.Booking_Type && data.Booking_Type == "SuperCheap"){
      var Required_Area = data.Required_Area;
      var Credit_Card_Amt = data.Credit_Card_Amt;
      var Balance = data.Balance;
      var Route_name = data.Route_name;
      var Inventory = data.Inventory;
      
      supercreapDetails += '\r Required Area : ' + Required_Area;
      supercreapDetails += '\r Route name : ' + Route_name;
      supercreapDetails += '\r Inventory : ' + Inventory;
      supercreapDetails += '\r Credit Card Amt : ' + Credit_Card_Amt;
      supercreapDetails += '\r Balance : ' + Balance;
      
    }
  
    var resultEvent = calendar.createEvent(Client_Name + Job_ID, sDate, eDate, {
                                           description: 'Client : ' + Client_Name
                                           + '\r Pickup : ' + Pickup_Address
                                           + '\r Drop off : ' + Drop_Off_Address
                                           + '\r Additional : ' + Additional_Pick_Up
                                           + '\r Contact Number : ' + Contact_Number
                                           + '\r Job Date : ' + Job_Date
                                           + '\r Job Time : ' + Job_Time
                                           + '\r Job ID : ' + Job_ID
                                           + '\r Price : ' + Price
                                           + '\r Driver Instructions : ' + Driver_Instructions
                                           + supercreapDetails
                                           + ozDetails
                                           + '\r\r <a target="_blank" href="'+booking_url+'">Update the Job</a>'
                                           });
  
    /*var calendar = CalendarApp.getCalendarById("q0rejpdcvnjml7lnlm46nt1tvc@group.calendar.google.com");
    var eDate = new Date('July 20, 2020 20:00:00 UTC+10:00');
    
    var resultEvent = calendar.createEvent("Testing", eDate, eDate, {
    description: 'Client : '
    });*/
  
    Logger.log("resultEvent: " + resultEvent.getId());
    
    resultEvent.addPopupReminder(120);
    
    //return resultEvent.getId();
  }
}

function checkAndDeleteEvent(cal, sDate, eDate, eTitle){
  var events = cal.getEvents(sDate, eDate);

  for(var i=0; i<events.length;i++)
    {
      var ev = events[i];
      var title = cal.getEventSeriesById(ev.getId()).getTitle();

      if (title.indexOf(eTitle)>-1){
        ev.deleteEvent();
      }
    }
}