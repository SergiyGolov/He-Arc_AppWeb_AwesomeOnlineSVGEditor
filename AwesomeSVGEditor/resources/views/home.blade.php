@extends('layouts.app')

@section('title', 'Page Title')

@section('content')
  <h1>Hello, <?php echo $name; ?></h1>
  <?php phpinfo(); ?>
@endsection
