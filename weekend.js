$( document )
	.ready( function () {

		var totalMonthly = 0;

		$( '#empInfo' )
			.on( 'submit', addEmp );
		$( '#employee-data' )
			.on( 'click', 'button', removeEmployee );


		function addEmp( event ) {
			event.preventDefault();

			var employee = parseForm();

			clearForm();

			totalMonthly = totalMonthlySalary + employee[ 'salary' ] / 12;

			updateMonthlySalaryDisplay();

			appendDom( employee );
		}

		function parseForm() {
			var employee = {};
			var fields = $( '#info' )
				.serializeArray();
			console.log( 'fields', fields );

			fields.forEach( function ( element ) {
				employee[ element.name ] = element.value;
			} );

			console.log( 'employee object', employee );

			return employee;
		}

		function clearForm() {
			$( '#employee-info' )
				.find( 'input[type=text],[type=number]' )
				.val( '' );
		}

		function updateMonthlySalaryDisplay() {
			$( '#monthly-salary' )
				.text( totalMonthlySalary.toFixed( 2 ) );
		}

		function appendDom( emp ) {
			var $emp = $( '<tr class="employee"></tr>' );


			$emp.append( '<td>' + emp[ 'empFirstName' ] + '</td>' );
			$emp.append( '<td>' + emp[ 'empLastName' ] + '</td>' );
			$emp.append( '<td>' + emp[ 'title' ] + '</td>' );
			$emp.append( '<td>' + emp[ 'id' ] + '</td>' );
			$emp.append( '<td>' + emp[ 'salary' ] + '</td>' );

			var $button = $( '<button>Remove</button>' );
			$button.data( 'salary', emp[ 'employee-salary' ] );


			var $td = $( '<td></td>' );
			$td.append( $button );

			$emp.append( $td );

			$( '#employee-data' )
				.append( $emp );
		}

		function removeEmployee() {
			var $clickedButton = $( this );
			console.log( 'Button:', $clickedButton );

			console.log( 'Button data:', $clickedButton.data( 'salary' ) );

			var salary = $clickedButton.data( 'salary' );
			var monthly = salary / 12;

			totalMonthlySalary = totalMonthlySalary - monthly;

			updateMonthlySalaryDisplay();


			$clickedButton.closest( 'tr' )
				.remove();
		}
	} );
