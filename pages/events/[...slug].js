import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventList from "../../components/events/EventList";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function filteredEvents() {
  const router = useRouter();
  const query = router.query.slug;

  if (!query) {
    return <p className="'center">Loading...</p>;
  }

  const filYear = query[0];
  const filMonth = query[1];

  const numYear = +filYear;
  const numMonth = +filMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
      </Fragment>
    </div>
  );
}

export default filteredEvents;
