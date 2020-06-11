const swaggerDocument =

{
    "swagger": "2.0",
    "info": {
        "description": "Grades Control API Description",
        "version": "1.0.0",
        "title": "Grades Control API Description"
    },
    "host": "localhost:3000",
    "tags": [
        {
            "name": "grades",
            "description": "Grades management"
        }
    ],
    "paths": {
        "/grades": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Get a full list of the grades",
                "description": "Get a full list of the grades",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Grade"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Insert a new grade",
                "description": "Insert a new grade with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradePost"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Grade created"
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "put": {
                "tags": [
                    "grades"
                ],
                "summary": "Modifies an existing grade",
                "description": "Modifies an existing grade with the received parameters",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Account object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradePut"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Grade modified"
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        },
        "/grades/id": {
            "get": {
                "tags": [
                    "grades"
                ],
                "summary": "Get existing grade by id",
                "description": "Get existing grade description by id",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Grade"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            },
            "delete": {
                "tags": [
                    "grades"
                ],
                "summary": "Delete grade by id",
                "description": "Delete existing grade by id",
                "produces": [
                    "application/json"
                ],
                "responses": {
                    "200": {
                        "description": "Successful operation",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Grade"
                            }
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        },
        "/account/totalGrade": {
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Sum of grades from a student in a subject",
                "description": "Consult the sum of grades from a student in a subject",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grade object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeSum"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Consult done",
                        "schema": {
                            "$ref": "#/definitions/TotalGradesResponse"
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        },
        "/account/averageGrade": {
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Average grade given a subject of a type",
                "description": "Consult the average grade given a subject of a type",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grade object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeMath"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Consult done",
                        "schema": {
                            "$ref": "#/definitions/AverageGradeResponse"
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        },
        "/account/topGrades": {
            "post": {
                "tags": [
                    "grades"
                ],
                "summary": "Top 3 grades given a subject of a type",
                "description": "Consult the top 3 grades given a subject of a type",
                "consumes": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Grade object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/GradeMath"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Consult done",
                        "schema": {
                            "$ref": "#/definitions/Grade"
                        }
                    },
                    "400": {
                        "description": "Error occurred"
                    }
                }
            }
        }
    },
    "definitions": {
        "Grade": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "example": "5"
                },
                "student": {
                    "type": "string",
                    "example": "Carlos Fernandes"
                },
                "subject": {
                    "type": "string",
                    "example": "02 - Node"
                },
                "type": {
                    "type": "string",
                    "example": "Desafio"
                },
                "value": {
                    "type": "integer",
                    "example": "40"
                },
                "timestamp": {
                    "type": "number",
                    "example": "2020-05-19T18:21:25.191Z"
                }
            }
        },
        "GradePost": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Carlos Fernandes"
                },
                "subject": {
                    "type": "string",
                    "example": "02 - Node"
                },
                "type": {
                    "type": "string",
                    "example": "Desafio"
                },
                "value": {
                    "type": "integer",
                    "example": "40"
                }
            }
        },
        "GradePut": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "example": "5"
                },
                "student": {
                    "type": "string",
                    "example": "Carlos Fernandes"
                },
                "subject": {
                    "type": "string",
                    "example": "02 - Node"
                },
                "type": {
                    "type": "string",
                    "example": "Desafio"
                },
                "value": {
                    "type": "integer",
                    "example": "40"
                }
            }
        },
        "GradeSum": {
            "type": "object",
            "properties": {
                "student": {
                    "type": "string",
                    "example": "Carlos Fernandes"
                },
                "subject": {
                    "type": "string",
                    "example": "02 - Node"
                }
            }
        },
        "GradeMath": {
            "type": "object",
            "properties": {
                "subject": {
                    "type": "string",
                    "example": "02 - Node"
                },
                "type": {
                    "type": "string",
                    "example": "Desafio"
                }
            }
        },
        "TotalGradesResponse": {
            "type": "object",
            "properties": {
                "result": {
                    "type": "string",
                    "example": "The sum of all grades in this subject from this student is 70"
                }
            }
        },
        "AverageGradeResponse": {
            "type": "object",
            "properties": {
                "result": {
                    "type": "string",
                    "example": "The average grade of this subject is 26"
                }
            }
        }
    }
};

module.exports = swaggerDocument;