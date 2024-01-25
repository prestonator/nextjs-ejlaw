/**
 * Creates a Zustand store to manage form state with devtools middleware enabled.
 * Exports the store instance as the default export.
 *
 * The store has state for each form step, with the step keys mapped by the
 * stepVariant object.
 *
 * The setData action allows updating the state for a specific step.
 */
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const stepVariant = {
	1: "stepOne",
	2: "stepTwo",
	3: "stepThree",
};

const useFormStore = create(
	devtools((set) => ({
		stepOne: {},
		stepTwo: {},
		stepThree: {},
		setData: ({ step, data }) =>
			set((state) => ({
				...state,
				[stepVariant[step]]: { ...state[stepVariant[step]], ...data },
			})),
	}))
);

export default useFormStore;
