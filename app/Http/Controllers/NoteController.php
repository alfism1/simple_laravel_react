<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Note;

class NoteController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        //
    }

    public function index(){
        return Note::all();
    }

    public function save(Request $request){
        $data = [
            'title' => $request->input('title'),
            'description' => $request->input('description'),
        ];

        $note = Note::create($data);

        return $note;
    }

    public function delete($id){
        Note::find($id)->delete();
        return $id;
    }
}
