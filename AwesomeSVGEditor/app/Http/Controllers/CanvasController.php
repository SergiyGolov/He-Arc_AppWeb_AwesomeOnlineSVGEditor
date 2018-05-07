<?php

namespace App\Http\Controllers;

use App\Canvas;
use Request;
use Response;
use Auth;
use Imagick;
use ImagickPixel;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;

use enshrined\svgSanitize\Sanitizer;

class CanvasController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth.basic');
    }

    private function validateAccessRights(int $id)
    {
      $canvas = Canvas::where('id',$id)->where(function ($query) {
          $query->where('visibility',1)
                ->orWhere('user_id',Auth::id());
        })->first();
      return $canvas;
    }

    /**
     * Download le canvas au format png
     *
     * @return PNG file
     */
    public function downloadPNG(int $id)
    {
      $canvas = CanvasController::validateAccessRights($id);
      if($canvas != false){

        $image = new IMagick();
        $image->setBackgroundColor(new ImagickPixel('transparent'));
        $image->readImageBlob('<?xml version="1.1" encoding="UTF-8" standalone="no"?>'.$canvas->code);
        $image->setImageFormat("png32");

        return response($image->getImageBlob())
              ->header('Content-Type', 'image/png')
              ->header('Content-Disposition', 'attachment')
              ->header('filename', 'image.png');
      }else if(Request::ajax()){
        $response = array(
            'status' => 'KO',
            'msg' => 'No rights to download'
        );
        return Response::json($response);
      }else{
          abort(403, 'Unauthorized action.');
      }
    }

    /**
     * Download le canvas au format svg
     *
     * @return SVG file
     */
    public function downloadSVG(int $id)
    {
      $canvas = CanvasController::validateAccessRights($id);
      if($canvas != false){
        return response('<svg version="1.1" xmlns="http://www.w3.org/2000/svg">'.$canvas->code)
              ->header('Content-Type', 'image/svg+xml')
              ->header('Content-Disposition', 'attachment')
              ->header('filename', 'image.svg');
      }else if(Request::ajax()){
        $response = array(
            'status' => 'KO',
            'msg' => 'No rights to download'
        );
        return Response::json($response);
      }else{
          abort(403, 'Unauthorized action.');
      }
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // List canvas
        $canvas = Canvas::where('visibility',1)->orWhere('user_id',Auth::id())->get();

        return View::make('canvas')->with('canvas', $canvas);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Open the editor with an empty canvas
        return View::make('editor');
    }

    /**
     * Sanitise an SVG
     *
     * @return \ a sanitized SVG or FALSE if an error occured
     */
    private static function sanityse($svg)
    {
      // Create a new sanitizer instance
      $sanitizer = new Sanitizer();
      // Pass it to the sanitizer and get it back clean
      return $sanitizer->sanitize($svg);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // validate
        // read more on validation at http://laravel.com/docs/validation
        if(Request::ajax()){
            $rules = array(
                'name'       => 'required',
                'visibility' => 'boolean'
            );
            $validator = Validator::make(Input::all(), $rules);
            $sanitizedSVG = CanvasController::sanityse(Input::get('code'));

            // process the login
            if ($validator->fails() || $sanitizedSVG == false ) {
                $response = array(
                    'status' => 'KO',
                    'msg' => 'Canvas failed tests',
                    'validator' => $validator->fails(),
                    'svg' => Input::get('code'),
                    'sanityse' => Input::get('code'),
                );
                return Response::json($response);
            } else {
                // store
                $canvas = new Canvas;

                $canvas->name       = Input::get('name');
                $canvas->code       = Input::get('code');
                $canvas->user_id    = Auth::id();
                $canvas->visibility = Input::get('visibility');

                $canvas->save();

                // redirect
                $response = array(
                    'status' => 'success',
                    'msg' => 'Canvas created successfully',
                    'id' => $canvas->id,
                );
                return Response::json($response);
            }
        }else{
            $response = array(
                'status' => 'KO',
                'msg' => 'Invalid use',
            );
            return Response::json($response);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Canvas  $canvas
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        // TODO return view
        $canvas = Canvas::validateAccessRights($id);
        abort(402, 'Not implemented yet.');
        //return view('user.profile', ['user' => Canvas::findOrFail($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Canvas  $canvas
     * @return \Illuminate\Http\Response
     */
    public function edit(int $id)
    {
        $canvas = Canvas::findOrFail($id);
        if($canvas->user_id != Auth::id()){
          abort(403, 'Unauthorized action.');
        }

        return view('editor', ['canvas' => $canvas]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id)
    {
        // TODO Update canvas

        //check if its our form
        if(Request::ajax()){

            $canvas =  Canvas::where('user_id',Auth::id())->where('id',$id)->firstOrFail();
            $rules = array(
                'name'       => 'required',
                'visibility' => 'boolean'
            );
            $validator = Validator::make(Input::all(), $rules);
            $sanitizedSVG = CanvasController::sanityse(Input::get('code'));

            // process the login
            if ($validator->fails() || $sanitizedSVG == false ) {
                $response = array(
                    'status' => 'KO',
                    'msg' => 'Canvas failed tests',
                    'svg' => Input::get('code'),
                    'sanityse' => Input::get('code'),
                );
                return Response::json($response);
            }

            $canvas->name       = Input::get('name');
            $canvas->code       = Input::get('code');
            $canvas->visibility = Input::get('visibility');

            $canvas->save();

            $response = array(
                'status' => 'success',
                'msg' => 'Canvas updated successfully',
            );
            return Response::json($response);
        }else{
            $response = array(
                'status' => 'KO',
                'msg' => 'Invalide use',
            );
            return Response::json($response);
        }

        //return view('editor', ['canvas' => Canvas::findOrFail($id)]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Canvas  $canvas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Canvas $canvas)
    {
        // TODO delete canvas
    }
}
