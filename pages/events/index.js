import { useRouter } from 'next/router';
import React, { Fragment } from 'react'
import EventSearch from '../../components/events/event-search'
import EventList from '../../components/events/EventList'
import { getAllEvents } from '../../helpers/api-util'


function AllEvents(props) {
    const events = props.events
    const router = useRouter();

    function findEventHandler(year, month) {
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

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        }
    }
}

export default AllEvents
