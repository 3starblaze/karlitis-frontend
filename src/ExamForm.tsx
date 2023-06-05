interface ExamFormData {
	address: string;
	examsToCheck: string[];
}

// interface ExamFormProps {
// 	onSubmit: (data: ExamFormData) => void;
// }

function ExamForm() {

	return (<form id="examForm" action="/" method="GET">
		<p className="text-2xl">Kāda ir jūsu dzīvesvietas adresse?</p>
		<input type="text" name="address" placeholder="aptuveni" className="border-2 border-custom-blue rounded-lg w-full h-10 px-4 my-4" /> <br /><br />

		<p className="text-2xl">Kādi priekšmeti jums interesē?</p>
		<hr />
		<br />
		<input type="checkbox" id="matematika" name="matematika" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="matematika" className="text-xl"> Matemātika</label><br />

		<input type="checkbox" id="latv_val" name="latv_val" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="latv_val" className="text-xl"> Latviešu Valoda</label><br />

		<input type="checkbox" id="anglu_val" name="anglu_val" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="anglu_val" className="text-xl"> Angļu Valoda</label><br />

		<input type="checkbox" id="francu_val" name="francu_val" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="francu_val" className="text-xl"> Franču Valoda</label><br />

		<input type="checkbox" id="krievu_val" name="krievu_val" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="krievu_val" className="text-xl"> Krievu Valoda</label><br />

		<input type="checkbox" id="vacu_val" name="vacu_val" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="vacu_val" className="text-xl"> Vācu Valoda</label><br />

		<input type="checkbox" id="biologija" name="biologija" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="biologija" className="text-xl"> Bioloģija</label><br />

		<input type="checkbox" id="fizika" name="fizika" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="fizika" className="text-xl"> Fizika</label><br />

		<input type="checkbox" id="kimija" name="kimija" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="kimija" className="text-xl"> Ķīmija</label><br />

		<input type="checkbox" id="vesture" name="vesture" value="True" className="w-6 h-6 mx-2 my-2" />
		<label htmlFor="vesture" className="text-xl"> Vēsture</label><br /><br />

		{/* <button onClick={(e) => {
			e.preventDefault();
			const dataRaw = new FormData(document.getElementById('examForm')! as HTMLFormElement);
			let formData: ExamFormData = {
				address: dataRaw.get("address") as string,
				examsToCheck: []
			}

			if(dataRaw.has("matematika")) formData.examsToCheck.push("matematika");
			if(dataRaw.has("latv_val")) formData.examsToCheck.push("latv_val");
			if(dataRaw.has("anglu_val")) formData.examsToCheck.push("anglu_val");
			if(dataRaw.has("francu_val")) formData.examsToCheck.push("francu_val");
			if(dataRaw.has("krievu_val")) formData.examsToCheck.push("krievu_val");
			if(dataRaw.has("vacu_val")) formData.examsToCheck.push("vacu_val");
			if(dataRaw.has("biologija")) formData.examsToCheck.push("biologija");
			if(dataRaw.has("fizika")) formData.examsToCheck.push("fizika");
			if(dataRaw.has("kimija")) formData.examsToCheck.push("kimija");
			if(dataRaw.has("vesture")) formData.examsToCheck.push("vesture");

			console.log(formData);
			props.onSubmit.call(null, formData);
		}}>Atlasīt</button> */}

		<div className="flex justify-center">
			<button type="submit" className="rounded-lg p-6 w-64 bg-custom-blue text-white text-xl">Atlasīt</button>
		</div>
	</form>)
}

export default ExamForm;