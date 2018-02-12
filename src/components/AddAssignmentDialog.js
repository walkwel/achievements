/**
 * @file AddAssignmentDialog container module
 * @author Theodor Shaytanov <theodor.shaytanov@gmail.com>
 * @created 28.01.18
 */

import React from "react";
import PropTypes from "prop-types";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog/index";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import Select from "material-ui/Select";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl } from "material-ui/Form";

class AddAssignmentDialog extends React.PureComponent {
  static propTypes = {
    assignment: PropTypes.any,
    userAchievements: PropTypes.object,
    onFieldChange: PropTypes.func.isRequired,
    onCommit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };
  /*
  handleChange = name => event => {
    // Reset default `name` and `details` for `Profile` question type
    if (
      name === "questionType" &&
      this.state.questionType === "Profile" &&
      event.target.value !== "Profile" &&
      this.state.name === "Enter CodeCombat profile" &&
      this.state.details === "https://codecombat.com/"
    ) {
      this.setState({
        name: "",
        details: ""
      });
    }

    // Set default `name` and `details` for `Profile` question type
    if (
      name === "questionType" &&
      event.target.value === "Profile" &&
      !(this.state.name || this.state.details)
    ) {
      return this.setState({
        questionType: "Profile",
        name: "Enter CodeCombat profile",
        details: "https://codecombat.com/"
      });
    }
  };*/

  render() {
    let {
      userAchievements,
      onFieldChange,
      open,
      onClose,
      onCommit,
      assignment
    } = this.props;
    assignment = assignment || {};

    userAchievements = userAchievements || {};
    userAchievements = userAchievements[assignment.questionType] || {};
    userAchievements = userAchievements.achievements || {};

    return (
      <Dialog open={open}>
        <DialogTitle>New Assignment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            select
            value={assignment.questionType || ""}
            onChange={onFieldChange("questionType")}
            label="Type of question"
            fullWidth
          >
            <MenuItem value="Text">Text</MenuItem>
            <MenuItem value="Profile">Enter Code Combat Profile</MenuItem>
            <MenuItem value="CodeCombat">Complete Code Combat Level</MenuItem>
          </TextField>
          <TextField
            onChange={onFieldChange("name")}
            margin="normal"
            label="Name"
            value={assignment.name || ""}
            fullWidth
          />
          <TextField
            onChange={onFieldChange("details")}
            margin="normal"
            label="Details/Links"
            value={assignment.details || ""}
            fullWidth
          />
          {assignment.questionType === "CodeCombat" ? (
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="select-multiple-levels">Levels</InputLabel>
              <Select
                multiple
                margin="none"
                value={assignment.levels || ""}
                onChange={onFieldChange("levels")}
                input={<Input id="select-multiple-levels" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 224,
                      width: 250
                    }
                  }
                }}
              >
                {Object.keys(userAchievements).map(id => (
                  <MenuItem key={userAchievements[id].name} value={id}>
                    {userAchievements[id].name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            undefined
          )}
          <TextField
            fullWidth
            label="Deadline"
            margin="normal"
            type="datetime-local"
            onChange={onFieldChange("deadline")}
            value={assignment.deadline || ""}
            InputLabelProps={{
              shrink: true
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button raised color="primary" onClick={onCommit}>
            Commit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddAssignmentDialog;