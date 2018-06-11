
<div id="modal-title" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Name of your image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Enter a new name for your amazing image.</p>
        <input id="name-modal" class="form-control" type="text" placeholder="Default input" value="{{ isset($canvas)?$canvas->name:'' }}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="save-modal" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div id="modal-import" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Import</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>How do you want to import your image?</p>
      </div>
      <div class="modal-footer">
        <button id="import-new" type="button" class="btn btn-primary">Open in a new tab</button>
        <button id="import-saveopen" type="button" class="btn btn-secondary">Save changes & Open here</button>
        <button id="import-discardopen" type="button" class="btn btn-warning">Discard changes & Open here</button>
      </div>
    </div>
  </div>
</div>

<div id="modal-export" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Export</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Export your image as :</p>
      </div>
      <div class="modal-footer">
        <a id="png-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/png" role="button" class="btn btn-primary png-file" download></a>
        <a id="svg-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/svg" role="button" class="btn btn-dark svg-file" download></a>
      </div>
    </div>
  </div>
</div>

<div id="modal-auth" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Authentification</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <ul class="nav nav-tabs" id="authTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="login-tab" data-toggle="tab" href="#tab-login" role="tab" aria-controls="login" aria-selected="true">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="register-tab" data-toggle="tab" href="#tab-register" role="tab" aria-controls="register" aria-selected="false">Register</a>
          </li>
        </ul>
        <div class="tab-content" id="authTabContent">
          <div class="tab-pane fade show active" id="tab-login" role="tabpanel" aria-labelledby="login-tab">
            <form id="login-form">
              @csrf
              <div class="form-group row">
                <label for="email-login" class="col-sm-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>
                <div class="col-md-6">
                  <input id="email-login" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email-login" value="{{ old('email') }}" required autofocus>
                  @if ($errors->has('email'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('email') }}</strong>
                  </span>
                  @endif
                </div>
              </div>
              <div class="form-group row">
                <label for="password-login" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
                <div class="col-md-6">
                  <input id="password-login" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password-login" required>
                  @if ($errors->has('password'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('password') }}</strong>
                  </span>
                  @endif
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6 offset-md-4">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}> {{ __('Remember Me') }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button id="btn-login" class="btn btn-primary">
                    {{ __('Login') }}
                  </button>
                  <a class="btn btn-link" href="{{ route('password.request') }}">
                    {{ __('Forgot Your Password?') }}
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div class="tab-pane fade" id="tab-register" role="tabpanel" aria-labelledby="register-tab">
            <form id="register-form">
              @csrf
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>
                <div class="col-md-6">
                  <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>
                  @if ($errors->has('name'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('name') }}</strong>
                  </span>
                  @endif
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>
                <div class="col-md-6">
                  <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required>
                  @if ($errors->has('email'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('email') }}</strong>
                  </span>
                  @endif
                </div>
              </div>
              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>
                <div class="col-md-6">
                  <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                  @if ($errors->has('password'))
                  <span class="invalid-feedback">
                    <strong>{{ $errors->first('password') }}</strong>
                  </span>
                  @endif
                </div>
              </div>
              <div class="form-group row">
                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>
                <div class="col-md-6">
                  <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                </div>
              </div>
              <div class="form-group row mb-0">
                <div class="col-md-6 offset-md-4">
                  <button id="btn-register" class="btn btn-primary">
                    {{ __('Register') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="modal-share" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Share link</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          @if(isset($canvas)||Auth::check())
          <?php
          $classShare='d-none';
          $classUnshare='d-none';
          $url='';
          if(isset($canvas)){
            if(!isset($canvas->id)){
              //Rien
            }else if($canvas->share==''){
              $classShare='';
            }else {
              $classUnshare='';
            }
            $url=URL::to("/canvas/{$canvas->share}");
          }
          ?>
          <div id="div-share" class="{{ $classShare }}">
            <a id="share-btn" role="button" class="btn btn-outline-primary float-right" href="#">Generate share link</a>
            <strong>Share this canvas</strong>
            <p class="card-text">Generate a share link to your show your work</p>
          </div>
          <div id="div-unshare" class="{{ $classUnshare }}">
            <a id="unshare-btn" role="button" class="btn btn-outline-primary float-right" href="#">Remove share link</a>
            <strong>Unshare this canvas</strong>
            <div>
              <label for="card-text">Your share link :</label>
              <div class="contact">
                <div class="input-group mb-3">
                  <input id="link-display" type="text" class="form-control" readonly aria-label="Share link" aria-describedby="basic-addon2" value="{{ $url }}">
                  <div class="input-group-append">
                    <button id="link-copy" type="button" class="btn btn-outline-default btn-copy js-tooltip js-copy" data-toggle="tooltip" data-placement="bottom" data-copy="{{ $url }}" title="Copy to clipboard">
                      <!-- icon from google's material design library -->
                      <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          @endif
          <?php
          $display = false;
          if(!Auth::check() || !isset($canvas)){
            $display = true;
          }else if(isset($canvas)){
            if(!isset($canvas->id)){
              $display = true;
            }
          }
           ?>
          @if($display)
          <div id="div-notshare">
            <strong>Save your work</strong>
            <p class="card-text">You have to save your work before generating a share link.</p>
          </div>
          @endif
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- Modal -->
<div class="modal fade" id="helpModal" tabindex="-1" role="dialog" aria-labelledby="helpModalTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="helpModalTitle">Help</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h4>Interface</h4>
        <p>The interface is composed of 4 sections which are the followings:</p>
        <ul>
          <li><a href="#helpMenu-bar">Menu bar</a></li>
          <li><a href="#helpDrawing-tools">Drawing tools</a></li>
          <li><a href="#helpEditor">Editor</a></li>
          <li><a href="#helpShapes">Shapes options</a></li>
          <li><a href="#helpShortcuts">Keyboard shortcuts</a></li>
        </ul>
        <h4 id="helpMenu-bar">Menu bar</h4>
        <h5>File</h5>
        <ul>
          <li><strong>Export as: </strong> you can export the canvas as an png or svg file</li>
          <li><strong>Import svg: </strong> you can import an svg file from your local filesystem with 3 options:</li>
          <ul>
            <li><strong>Open in a new tab: </strong> opens a new tab with the freshly imported svg canvas</li>
            <li><strong>Save changes & Open here: </strong> saves the canvas on current page and remplace it with imported svg canvas</li>
            <li><strong>Discard changes & Open here: </strong> you will lose the canvas on the current page and the imported svg canvas will replace it</li>
          </ul>
          <li><strong>Get share link: </strong> You can generate a share link which allows to view your canvas, without making it publicly accessible to everyone</li>
        </ul>
        <h5>Edit</h5>
        <ul>
          <li><strong>Edit canvas name: </strong> allows to change the canvas name</li>
          <li><strong>Publicly visible: </strong> if checked, everyone can see your canvas on the "Explore" page</li>
        </ul>
        <hr>
        <h4 id="helpDrawing-tools">Drawing tools</h4>
        <p>This section is located on the left of the page and offer all the options for drawing.</p>
        <div>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" xml:space="preserve">
            <polygon class="fill" points="429.742,319.31 82.489,0 82.258,471.744 187.633,370.918 249.523,512 346.083,469.642 284.193,328.56"/>
            </svg>
            Pointer tool: select shape to move/resize
            <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 493.638 493.638" xml:space="preserve">
            <polygon class="fill" fill="#020202" points="427.092,118.538 99.89,445.738 90.239,436.086 417.439,108.885 358.708,50.154
            31.376,377.481 116.022,462.13 443.351,134.798"/>
            <path class="fill" file="#020202" d="M492.627,85.523c-10.064,23.448-43.053,43.053-43.053,43.053l-84.646-84.644
            c0,0,27.29-33.513,43.054-43.053S502.692,62.074,492.627,85.523z"/>
            <polygon class="fill" fill="#020202" points="110.059,468.088 0.127,493.638 25.413,383.447"/>
            </svg>
            Free draw tool
              <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 511.998 511.998" xml:space="preserve">
            <line class="stroke" fill="none" stroke="#000" stroke-width="70" stroke-opacity="null" fill-opacity="null" x1="0" y1="0"
            x2="511.998" y2="511.998" stroke-linejoin="null" stroke-linecap="null" stroke-dasharray="none"></line>
          </svg>
          Line draw tool
            <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 64 48" xml:space="preserve">
            <rect class="fill" width="64" height="48"/>
            </svg>
            Rectangle draw tool, press shift while drawing to draw a square
              <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 300" xml:space="preserve">
            <ellipse class="fill" fill="#000000" stroke="none" cx="256" cy="150" rx="256" ry="150"></ellipse>
            </svg>
            Ellipse draw tool, press shift while drawing to draw a circle
              <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 900.5 900.5" style="enable-background:new 0 0 900.5 900.5;" xml:space="preserve">
              <g>
                <path class="fill" fill="#020202" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z
                M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/>
                <path class="fill" fill="#020202" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874
                c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576
                c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/>
              </g>
            </svg>
            Erase tool: click on a shape to erase it
              <br/>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 96 96" xml:space="preserve">
              <rect class="fill-color" fill="#f00" width="64" height="64"/>
              <g >
                <rect class="stroke-color" stroke="#fff" stroke-width="1" fill="#0f0" x="32" y="32" width="64" height="64"/>
                <rect fill="#fff" stroke-width="1" x="52" y="52" width="24" height="24"/>
              </g>
              </svg>
              Select shape fill (filled back square) /stroke (front square with borders) color
              <br/>
              <img src="{{ URL::to('/') }}/img/strokeWidth.png" alt="Stroke width"/>
              Select the stroke width in pixels
        </div>
        <hr>
        <h4 id="helpEditor">Editor</h4>
        Central white area of the page, it is here that you can draw your canvas
        <hr>
        <h4 id="helpShapes">Shapes section</h4>
        It's the area on the right side of the page, when you click on a shape/background this area will contain actual information on the selected shape, and you can modify these settings (which one is avalaible depends on the selected shape type) :
        <ul>
          <li><strong>Width:</strong> Shape's width</li>
          <li><strong>Height:</strong> Shape's height</li>
          <li><strong>X:</strong> Shape's x position</li>
          <li><strong>Y:</strong> Shape's y position</li>
          <li><strong>Stroke (px):</strong> shape's stroke width in pixels</li>
          <li><strong>Stroke:</strong> Shape's stroke color</li>
          <li><strong>Fill:</strong> Shape's fill color</li>
          <li><strong>Move forward:</strong> Move forward the shape (it will eventually be in front of all the other shapes)</li>
          <li><strong>Move backward:</strong> Move backward the shaper (it will eventually be behind all the other shapes)</li>
          <li><strong>X1:</strong> A line's starting x position</li>
          <li><strong>Y1:</strong> A line's starting y position</li>
          <li><strong>X2:</strong> A line's ending x position</li>
          <li><strong>Y2:</strong> A line's ending y position</li>
        </ul>
        <hr>
        <h4 id="helpShortcuts">Keyboard shortcuts</h4>
        <ul>
          <li><kbd>F1</kbd> Show this help menu</li>
          <li><kbd>Ctrl+F1</kbd> Show help popover on the drawing tools</li>
          <li><kbd>Ctrl+S</kbd> Save canvas</li>
          <li><kbd>1</kbd> Select pointer tool</li>
          <li><kbd>2</kbd> Select free draw tool</li>
          <li><kbd>3</kbd> Select line tool</li>
          <li><kbd>4</kbd> Select rectangle tool</li>
          <li><kbd>5</kbd> Select ovale tool</li>
          <li><kbd>6</kbd> ou <kbd> Delete</kbd> Select delete tool</li>
        </ul>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
