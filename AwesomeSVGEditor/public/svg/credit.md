https://www.flaticon.com/free-icon/edit_109488#term=pen&page=1&position=50
https://www.flaticon.com/free-icon/cursor_587376#term=mouse&page=1&position=40
https://www.flaticon.com/free-icon/diagonal-line_764613#term=line%20diagonal&page=1&position=11


http://editor.method.ac/





/**
 * Run the migrations.
 *
 * @return void
 */
public function up()
{
	Schema::create('canvas', function (Blueprint $table) {
		$table->increments('id');
		$table->string('name');
		$table->string('code');
		$table->smallInteger('visibility');
		$table->integer('user_id')->unsigned();
		$table->foreign('user_id')->references('id')->on('users');
		$table->timestamps();
	});
}
