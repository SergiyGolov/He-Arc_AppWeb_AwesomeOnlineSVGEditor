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
      <h2>Crédits</h2>
      <p>Ce projet a été réalisé dans le cadre du cours "Application Web" à la Haute école Arc Ingénierie (Neuchâtel) avec comme professeur responsable, M. Marc Schaefer.</p>
      <hr>
      <h3>Auteurs</h3>
      <ul>
        <li>Goloviatinski Sergiy</li>
        <li>Wermeille Bastien</li>
      </ul>
      <hr>
      <h3>Ressources</h3>
      <p>Tout le contenu utilisé durant la réalisation de ce projet est libre de droit.</p>
      <p>Les icones basiques ont été réalisées par nos soins et les plus évoluées proviennent du site <a href="https://www.flaticon.com/">FlatIcon</a>, dont voici les crédits:</p>
      <ul>
        <li>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></li>
        <li>Icons made by <a href="https://www.flaticon.com/authors/hanan" title="Hanan">Hanan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></li>
      </ul>
      <p>La structure de l'éditeur est inspiré du site web <a href="http://editor.method.ac/">editor.method.ac/</a> qui est un projet avec Licence MIT accessible sur <a href="https://github.com/duopixel/Method-Draw">GitHub</a></p>
      <p>Finalement, les couleurs et la partie d'administration lors de la visualisation d'un canvas se base sur le design de <a href="https://github.com/">GitHub</a></p>
    </div>
  </div>
</div>
@endsection
