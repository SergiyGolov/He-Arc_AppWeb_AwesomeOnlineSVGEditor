<?php

namespace App\Http\Controllers;

use App\Canvas;
use Request;
use Response;
use Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;

class CanvasController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth.basic');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // List canvas
        $canvas = Canvas::all();

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
                'name'       => 'required'
            );
            $validator = Validator::make(Input::all(), $rules);

            // process the login
            if ($validator->fails()) {
                $response = array(
                    'status' => 'KO',
                    'msg' => 'Canvas failed tests',
                );
                return Response::json($response);
            } else {
                // store
                $canvas = new Canvas;

                $canvas->name       = Input::get('name');
                $canvas->code       = Input::get('code');
                $canvas->user_id    = Auth::id();
                $canvas->visibility = 1;

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
                'status' => 'Invalid use',
                'msg' => 'Error',
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
    public function show(Canvas $canvas)
    {
        // TODO return view

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
     * @param  \App\Canvas  $canvas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id)
    {
        // TODO Update canvas

        //check if its our form
        if(Request::ajax()){

            $canvas =  Canvas::findOrFail($id);
            if($canvas->user_id != Auth::id()){
              abort(403, 'Unauthorized action.');
            }

            $canvas->name       = Input::get('name');
            $canvas->code       = Input::get('code');
            $canvas->visibility = 1; //TODO Update this part

            $canvas->save();

            $response = array(
                'status' => 'success',
                'msg' => 'Canvas updated successfully',
            );
            return Response::json($response);
        }else{
            $response = array(
                'status' => 'Invalid use',
                'msg' => 'Error',
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
