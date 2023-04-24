import { Dialog, DialogTitle, Button, DialogActions, DialogContent, DialogContentText, Divider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { CommonColors } from "../constants";
import { ReportDialogProps } from "../types";

export const ReportDialog = (props: ReportDialogProps) => {
    const { handleClose, vacuumData, open } = props;
  
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            data-testid="report-dialog"
            aria-labelledby="report-dialog-title"
            aria-describedby="report-dialog-description"
            sx={{
                '& .MuiPaper-root': {
                    width: '450px',
                    height: '300px',
                    background: CommonColors.textLight
                },
                '& .MuiDialogTitle-root':{
                    color: CommonColors.dark,
                    fontSize: '20px',
                    fontWeight: 'bold'
                },
                '& .MuiTypography-root': {
                    display: 'block'
                },
                '& li': {
                    listStyle: 'none'
                }
            }}
        >
            <DialogTitle id="report-dialog-title">
                Vacuum Report
            </DialogTitle>
            <Divider sx={{ bgcolor: CommonColors.dark }} component="li" />
            <DialogContent>
                <DialogContentText id="report-dialog-description">
                    <Typography variant="h6" mb={2} component="span" data-testid="reportX">
                        {`X: ${vacuumData.placeX}`}
                    </Typography>
                    <Typography variant="h6" mb={2} component="span" data-testid="reportY">
                        {`Y: ${vacuumData.placeY}`}
                    </Typography>
                    <Typography variant="h6" mb={2} component="span" data-testid="reportDirection">
                        {`Direction: ${vacuumData.direction.toUpperCase()}`}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <Divider sx={{ bgcolor: CommonColors.dark }} component="li" />
            <DialogActions>
                <Button 
                    variant="contained"
                    color="primary" 
                    onClick={() => handleClose(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
  }