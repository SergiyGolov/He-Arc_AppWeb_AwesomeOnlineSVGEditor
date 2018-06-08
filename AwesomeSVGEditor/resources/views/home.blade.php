@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row">
    <section class="col-md-6 col-sm-12">
      <div class="centered">
        <h2>Create your own SVG</h2>
        <img src="{{ URL::to('/') }}/img/editor.PNG" alt="Amazing SVG Editor"/>
        {{ Html::link('/canvas/create', 'Start right now', array('class' => 'btn btn-outline-primary btn-lg')) }}
      </div>
    </section>
    <section class="col-md-6 col-sm-12">
      <div class="centered">
        <h2>Explore existing SVG</h2>
        <img src="{{ URL::to('/') }}/img/gallery.PNG" alt="Amazing gallery"/>
        {{ Html::link('/canvas', 'Let\'s explore', array('class' => 'btn btn-outline-primary btn-lg')) }}
      </div>
    </section>
  </div>
  <div class="row">
    <div class="col-md-12 col-sm-12">
      <h2>Credits</h2>
      <p>This project has been carried out during the cours "Application Web" at Haute école Arc Ingénierie (Neuchâtel) with mister Marc Schaefer as responsible teacher.</p>
      <hr>
      <h3>Authors</h3>
      <ul>
        <li>Goloviatinski Sergiy</li>
        <li>Wermeille Bastien</li>
      </ul>
      <hr>
      <h3>Resources</h3>
      <p>All the content used in this project is free for use.</p>
      <p>Basics icons have been realized by ourself but icons more advanced came from the website <a href="https://www.flaticon.com/">FlatIcon</a>. Here are the credits for those icons:</p>
      <ul>
        <li>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></li>
        <li>Icons made by <a href="https://www.flaticon.com/authors/hanan" title="Hanan">Hanan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></li>
      </ul>
      <p>The structure of our SVG editor is inspired by the website <a href="http://editor.method.ac/">editor.method.ac/</a> which is an open source project under MIT Licence accessible here: <a href="https://github.com/duopixel/Method-Draw">GitHub</a></p>
      <p>Colors and canvas' admin sections in canvas visualisation are based on design of <a href="https://github.com/">GitHub</a></p>
    </div>
  </div>
</div>
@endsection
