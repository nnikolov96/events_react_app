class EventsController < ApplicationController
  def index
    @events = [
      {
        title: "London Retail Expo",
        datetime: "Monday 14 Oct, 2019",
        location: "London Excel Centre"
      },
      {
        title: "Enterprise Sales Training Workshop",
        datetime: "Tuesday 15 Oct, 2019",
        location: "Expert Sales Company Headquarters"
      }
    ]
  end
end
