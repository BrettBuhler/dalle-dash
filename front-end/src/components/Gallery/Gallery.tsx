import "./GalleryStyles.css"

interface GalleryProps {
    userId?: string
}

const Gallery: React.FC<GalleryProps> = ({userId = false}) => {
    if (userId) console.log('tylescript error')
    return (
        <div className="gallery-container">
            <div className="main-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Main Image" className="large-img" />
            </div>
            <div className="small-images">
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 1" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 2" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 3" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 4" className="small-img"/>
                </div>
            </div>
            <div className="mirror-images">
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 4" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 3" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 2" className="small-img"/>
                </div>
                <div className="small-image">
                <img src="https://mzgtyjcxyagpajmyawnq.supabase.co/storage/v1/object/sign/images/image_1691373216338.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VfMTY5MTM3MzIxNjMzOC5qcGciLCJpYXQiOjE2OTEzNzY3NDEsImV4cCI6MTY5MTk4MTU0MX0.7ZBg8pmA2zePSJeCx3NjCFLL4AB6GmepDx1M7qJ3nJ0&t=2023-08-07T02%3A52%3A19.059Z" alt="Small Image 1" className="small-img"/>
                </div>
            </div>
        </div>
    )
}

export default Gallery