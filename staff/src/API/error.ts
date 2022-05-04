export class AppException extends Error {
	validation: boolean;
	validationFields: string[];
	constructor(message = '', validation = false, validationFields = []) {
		super(message);
		this.validation = validation;
		this.validationFields = validationFields;
		this.message = message;
	}

	toString() {
		return this.message;
	}
}
