import { useRouter } from 'next/router';
import React, { Fragment } from 'react'
import EventSearch from '../../components/events/event-search'
import EventList from '../../components/events/EventList'
import { getAllEvents } from '../../dummy-data'


function AllEvents() {
    const events = getAllEvents();
    const router = useRouter();

    function findEventHandler(year, month) {
        console.log(year, month)
        const fullPath = `/events/${year}/${month}`

        router.push(fullPath)
    }

    return (
        <Fragment>
            <EventSearch onSearch = {findEventHandler}/>
            <EventList items={events} />
        </Fragment>
    )
}

export default AllEvents
