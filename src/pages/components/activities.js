import ActivitiesItem from './activitiesitem';

export default function activities({ todoData }) {
  return (
    <div className="col-sm-12">
      <div className="card w-100 locat-activities border-0 shadow-sm">
          <div className="card-body">
              <div className="card-group activities-row">
                {todoData && todoData.map((item, index) => 
                  <ActivitiesItem todoItem={item} />
                )}
              </div>
          </div>
      </div>
    </div>
  );
}