<?php

namespace App\Http\Controllers;

use App\Canvas;
use Illuminate\Http\Request;

class CanvasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // List canvas
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // TODO editor to create a new canvas
        return view('editor', ['canvas' => Null]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // TODO create a new canvas
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
    public function edit(Canvas $canvas)
    {
        //
        return view('editor', ['canvas' => Canvas::findOrFail($id)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Canvas  $canvas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Canvas $canvas)
    {
        // TODO Update canvas

        return view('editor', ['canvas' => Canvas::findOrFail($id)]);
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
