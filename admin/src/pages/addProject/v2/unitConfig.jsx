import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    CircularProgress,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import React from "react";
import AddPropertyUnit from "../../../components/addProjectUnit";
import { updateTowerNumbers } from "../../../utils/asyncProject";
import useStyles from "../addProject.style";
import EditTextField from "./editTextField";

const UnitConfig = ({
    handleNext,
    projectType,
    resources,
    projectInfo,
    fetchProject,
    projectProperties,
}) => {
    const cancelToken = React.useRef(undefined);
    const [open, setOpen] = React.useState(false);
    const [showEdit, setShowEdit] = React.useState(null);
    const [selectedTower, setSelectedTower] = React.useState(null);
    const [updateTowerLoading, setUpdateTowerLoading] = React.useState(false);
    const [towers, setTowers] = React.useState(1);
    const [items, setItems] = React.useState([]);
    const classes = useStyles();

    const toggleDialog = (status) => () => {
        setOpen(status);
    };

    const handleSHowEdit = (towerDetails) => () => {
        if (showEdit && showEdit.id === towerDetails.id) {
            setShowEdit(null);
        } else {
            setShowEdit(towerDetails);
        }
    };
    const onAddClick = (towerDetails) => () => {
        setSelectedTower(towerDetails);
        toggleDialog(true)();
    };

    const updateTower = () => {
        if (towers) {
            cancelToken.current = axios.CancelToken.source();
            updateTowerNumbers(
                projectInfo.id,
                {
                    towers: towers,
                    towerNames: Array.from(
                        { length: towers },
                        (_, i) => projectInfo.towerNames.length + (i + 1)
                    ).map((c) => ({ name: `${c}` })),
                },
                cancelToken.current,
                setUpdateTowerLoading
            )
                .then((resp) => {
                    fetchProject();
                })
                .catch((error) => {
                    console.log(error);
                    // setAddProjectError(error);
                });
        }
    };
    const setTowerButtonProps = {};
    if (updateTowerLoading) {
        setTowerButtonProps.endIcon = (
            <CircularProgress size={20} color="inherit" />
        );
    }

    React.useEffect(() => {
        fetchProject();
    }, [fetchProject]);
    return (
        <>
            {projectInfo.id && (
                <Box className={classes.wrapper}>
                    <AddPropertyUnit
                        open={open}
                        handleClose={toggleDialog(false)}
                        projectType={projectType}
                        resources={resources}
                        items={items}
                        setItems={setItems}
                        project={projectInfo.id}
                        tower={selectedTower}
                        fetchProject={fetchProject}
                    />
                    <Box mb="1rem">
                        <TextField
                            id="filled-basic"
                            label="Number of towers to add"
                            variant="filled"
                            type="number"
                            value={towers}
                            onChange={(e) => setTowers(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        {...setTowerButtonProps}
                        onClick={updateTower}
                    >
                        Add Towers
                    </Button>

                    <h3>Unit Config</h3>
                    {/* <pre>{JSON.stringify(projectInfo, null, 2)}</pre> */}
                    <Grid container spacing={3}>
                        {projectInfo.towerNames.map((c) => (
                            <Grid item xs={12} md={4} key={c._id}>
                                <Card>
                                    <CardHeader
                                        action={
                                            <IconButton
                                                aria-label="settings"
                                                onClick={handleSHowEdit(c)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        }
                                        title={
                                            showEdit &&
                                            showEdit._id === c._id ? (
                                                <EditTextField
                                                    tower={c}
                                                    project={projectInfo.id}
                                                    fetchProject={fetchProject}
                                                    setShowEdit={setShowEdit}
                                                />
                                            ) : (
                                                c.name
                                            )
                                        }
                                        subheader={`Tower- ${c.name}`}
                                    />

                                    <List
                                        dense={true}
                                        className={
                                            classes.propertyItemsContainer
                                        }
                                    >
                                        {projectProperties
                                            .filter(
                                                (b) => b.tower._id === c._id
                                            )
                                            .map((b) => (
                                                <ListItem key={b}>
                                                    <ListItemText
                                                        primary={b.title}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="delete"
                                                            size="small"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                    </List>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={onAddClick(c)}
                                        >
                                            Add Floor plan
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </>
    );
};
export default UnitConfig;
