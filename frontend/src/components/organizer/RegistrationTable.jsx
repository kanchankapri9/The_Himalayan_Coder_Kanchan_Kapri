import { Button, Chip, Typography } from '@mui/material'
import './RegistrationTable.css'

function RegistrationTable({ rows, showActions = false, onApprove, onReject }) {
  return (
    <div className="registration-table">
      <div className="registration-table__head">
        <span>Attendee</span>
        <span>Ticket</span>
        <span>Status</span>
        <span>Submitted</span>
        <span>Amount</span>
        {showActions ? <span>Actions</span> : null}
      </div>

      {rows.map((row) => (
        <article key={row.id} className="registration-table__row">
          <div>
            <Typography className="registration-table__title">{row.attendeeName}</Typography>
            <Typography className="registration-table__text">{row.email}</Typography>
            <Typography className="registration-table__text">{row.college}</Typography>
          </div>

          <div>
            <Typography className="registration-table__title">{row.ticketName}</Typography>
            <Typography className="registration-table__text">{row.registrationNumber}</Typography>
          </div>

          <div>
            <Chip
              label={row.status}
              className={`registration-table__chip registration-table__chip--${
                row.status === 'confirmed' ? 'success' : row.status === 'pending' ? 'warning' : 'neutral'
              }`}
            />
          </div>

          <div>
            <Typography className="registration-table__text">{row.createdAt}</Typography>
          </div>

          <div>
            <Typography className="registration-table__title">{row.amount}</Typography>
          </div>

          {showActions ? (
            <div className="registration-table__actions">
              <Button variant="contained" className="registration-table__button" onClick={() => onApprove?.(row.id)}>
                Approve
              </Button>
              <Button variant="text" className="registration-table__link" onClick={() => onReject?.(row.id)}>
                Reject
              </Button>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export default RegistrationTable
