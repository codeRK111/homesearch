import { Box, Button, Grid } from "@material-ui/core";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

export const IdConfiguration = ({ floor, type, setIds }) => {
    const [unitIds, setUnitIds] = useState([]);
    useEffect(() => {
        const idArray = [];
        for (let index = 1; index <= floor; index++) {
            const floorObj = {};
            const floorIds = [];
            for (let j = 1; j <= type; j++) {
                floorIds.push({
                    type: j,
                    id: "",
                });
            }

            floorObj.floor = index;
            floorObj.floorIds = floorIds;
            idArray.push(floorObj);
        }
        setUnitIds(idArray);
    }, [floor, type]);

    const autoComplete = () => {
        const minValue = prompt("ID starts from");
        const completedIds = unitIds.map((c, i) => {
            const updatedIds = c.floorIds.map((b) => ({
                ...b,
                id:
                    i === 0
                        ? Number(minValue) * c.floor + b.type
                        : Number(minValue) + 100 * i + b.type,
            }));
            c.floorIds = updatedIds;

            return c;
        });
        setUnitIds(completedIds);
    };

    return (
        <div>
            <Box mt="1rem">
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={autoComplete}
                >
                    Auto complete
                </Button>
            </Box>
            {/* <pre>{JSON.stringify(unitIds, null, 2)}</pre> */}
            <Formik
                initialValues={{ towerInfo: unitIds }}
                enableReinitialize
                onSubmit={(values) => setIds(values.towerInfo)}
                render={({ values }) => (
                    <Form>
                        <FieldArray
                            name="towerInfo"
                            render={(arrayHelpers) => (
                                <div>
                                    {values.towerInfo &&
                                        values.towerInfo.length > 0 &&
                                        values.towerInfo.map((info, index) => (
                                            <Grid
                                                container
                                                spacing={3}
                                                key={index}
                                            >
                                                {info.floorIds.map(
                                                    (floorId, j) => (
                                                        <Grid
                                                            item
                                                            xs={2}
                                                            key={j}
                                                        >
                                                            <Field
                                                                name={`towerInfo[${index}].floorIds[${j}].id`}
                                                                type="text"
                                                                placeholder={`Floor - ${info.floor} & Type - ${floorId.type}`}
                                                            />
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                        ))}
                                    <Box mt="1rem">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </div>
                            )}
                        />
                    </Form>
                )}
            />
        </div>
    );
};
