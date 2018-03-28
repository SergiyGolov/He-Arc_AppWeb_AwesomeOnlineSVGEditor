@extends('layout')

@section('title', 'Page Title')

@section('content')
  <h1>Hello, <?php $name='test';echo $name; ?></h1>
  <?php phpinfo(); ?>
@endsection
