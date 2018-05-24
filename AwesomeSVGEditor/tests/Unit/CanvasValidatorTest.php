<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Http\Controllers\CanvasController;

class CanvasValidatorTest extends TestCase
{
    /**
     * A Malformed SVG
     *
     * @return void
     */
    public function testSVGWithScript()
    {
      $svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><svg id="SvgjsSvg1006" width="1000" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><ellipse id="SvgjsEllipse1009" rx="196" ry="119" cx="757.5" cy="125.5" stroke="#000000" stroke-width="1" fill="#000000"></ellipse><line id="SvgjsLine1010" x1="149" y1="82" x2="436" y2="404" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1011" x1="709" y1="397" x2="286" y2="479" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1012" x1="208" y1="436" x2="259" y2="280" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1013" x1="283" y1="248" x2="369" y2="223" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1014" x1="440" y1="263" x2="552" y2="342" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1015" x1="608" y1="378" x2="607" y2="421" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1016" x1="574" y1="447" x2="534" y2="470" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1017" x1="453" y1="478" x2="342" y2="468" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1018" x1="298" y1="431" x2="262" y2="400" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1019" x1="210" y1="355" x2="202" y2="330" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1020" x1="198" y1="313" x2="212" y2="277" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1021" x1="232" y1="245" x2="288" y2="211" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1022" x1="337" y1="208" x2="438" y2="244" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1023" x1="568" y1="318" x2="745" y2="405" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1024" x1="863" y1="384" x2="785" y2="337" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1025" x1="654" y1="339" x2="447" y2="369" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1026" x1="201" y1="293" x2="73" y2="135" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1027" x1="167" y1="127" x2="496" y2="341" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1028" x1="597" y1="456" x2="612" y2="473" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1029" x1="447" y1="108" x2="288" y2="295" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1030" x1="248" y1="91" x2="337" y2="390" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1031" x1="426" y1="414" x2="617" y2="418" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1032" x1="812" y1="394" x2="936" y2="363" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1033" x1="922" y1="418" x2="733" y2="467" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1034" x1="586" y1="474" x2="357" y2="485" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1035" x1="210" y1="473" x2="146" y2="469" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1036" x1="107" y1="449" x2="102" y2="357" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1037" x1="109" y1="297" x2="138" y2="190" stroke="#000000" stroke-width="50"></line><script>alert("hello");</script></svg>';
      $canvas = CanvasController::sanitise($svg);
      $this->assertTrue($canvas==null);
    }

    /**
     * A Malformed SVG
     *
     * @return void
     */
    public function testSVGWithDuplicateHeader()
    {
      $svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><svg version="1.1" xmlns="http://www.w3.org/2000/svg"><svg id="SvgjsSvg1006" width="1000" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><ellipse id="SvgjsEllipse1009" rx="196" ry="119" cx="757.5" cy="125.5" stroke="#000000" stroke-width="1" fill="#000000"></ellipse><line id="SvgjsLine1010" x1="149" y1="82" x2="436" y2="404" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1011" x1="709" y1="397" x2="286" y2="479" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1012" x1="208" y1="436" x2="259" y2="280" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1013" x1="283" y1="248" x2="369" y2="223" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1014" x1="440" y1="263" x2="552" y2="342" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1015" x1="608" y1="378" x2="607" y2="421" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1016" x1="574" y1="447" x2="534" y2="470" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1017" x1="453" y1="478" x2="342" y2="468" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1018" x1="298" y1="431" x2="262" y2="400" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1019" x1="210" y1="355" x2="202" y2="330" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1020" x1="198" y1="313" x2="212" y2="277" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1021" x1="232" y1="245" x2="288" y2="211" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1022" x1="337" y1="208" x2="438" y2="244" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1023" x1="568" y1="318" x2="745" y2="405" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1024" x1="863" y1="384" x2="785" y2="337" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1025" x1="654" y1="339" x2="447" y2="369" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1026" x1="201" y1="293" x2="73" y2="135" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1027" x1="167" y1="127" x2="496" y2="341" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1028" x1="597" y1="456" x2="612" y2="473" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1029" x1="447" y1="108" x2="288" y2="295" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1030" x1="248" y1="91" x2="337" y2="390" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1031" x1="426" y1="414" x2="617" y2="418" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1032" x1="812" y1="394" x2="936" y2="363" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1033" x1="922" y1="418" x2="733" y2="467" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1034" x1="586" y1="474" x2="357" y2="485" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1035" x1="210" y1="473" x2="146" y2="469" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1036" x1="107" y1="449" x2="102" y2="357" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1037" x1="109" y1="297" x2="138" y2="190" stroke="#000000" stroke-width="50"></line><script>alert("hello");</script></svg>';
      $canvas = CanvasController::sanitise($svg);
      $this->assertTrue($canvas==null);
    }

    /**
     * SVG with script inside
     *
     * @return void
     */
    public function testCorrectSVG(){
      $svg = '<svg id="SvgjsSvg1006" width="1000" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"><ellipse id="SvgjsEllipse1009" rx="196" ry="119" cx="757.5" cy="125.5" stroke="#000000" stroke-width="1" fill="#000000"></ellipse><line id="SvgjsLine1010" x1="149" y1="82" x2="436" y2="404" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1011" x1="709" y1="397" x2="286" y2="479" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1012" x1="208" y1="436" x2="259" y2="280" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1013" x1="283" y1="248" x2="369" y2="223" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1014" x1="440" y1="263" x2="552" y2="342" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1015" x1="608" y1="378" x2="607" y2="421" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1016" x1="574" y1="447" x2="534" y2="470" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1017" x1="453" y1="478" x2="342" y2="468" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1018" x1="298" y1="431" x2="262" y2="400" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1019" x1="210" y1="355" x2="202" y2="330" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1020" x1="198" y1="313" x2="212" y2="277" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1021" x1="232" y1="245" x2="288" y2="211" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1022" x1="337" y1="208" x2="438" y2="244" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1023" x1="568" y1="318" x2="745" y2="405" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1024" x1="863" y1="384" x2="785" y2="337" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1025" x1="654" y1="339" x2="447" y2="369" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1026" x1="201" y1="293" x2="73" y2="135" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1027" x1="167" y1="127" x2="496" y2="341" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1028" x1="597" y1="456" x2="612" y2="473" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1029" x1="447" y1="108" x2="288" y2="295" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1030" x1="248" y1="91" x2="337" y2="390" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1031" x1="426" y1="414" x2="617" y2="418" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1032" x1="812" y1="394" x2="936" y2="363" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1033" x1="922" y1="418" x2="733" y2="467" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1034" x1="586" y1="474" x2="357" y2="485" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1035" x1="210" y1="473" x2="146" y2="469" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1036" x1="107" y1="449" x2="102" y2="357" stroke="#000000" stroke-width="50"></line><line id="SvgjsLine1037" x1="109" y1="297" x2="138" y2="190" stroke="#000000" stroke-width="50"></line></svg>';
      $canvas = CanvasController::sanitise($svg);
      $this->assertTrue($canvas!=null);
    }

    /**
     * Correct SVG
     *
     * @return void
     */
    public function testCorrectSvg2(){
      $svg = '<svg id="SvgjsSvg1006" width="1000" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1007"></defs><rect id="SvgjsRect1008" width="291" height="178" stroke="#000000" stroke-width="1" x="372" y="175" fill="#000000"></rect><line id="SvgjsLine1009" x1="148" y1="221" x2="425" y2="65" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1010" x1="622" y1="258" x2="623" y2="259" stroke="#000000" stroke-width="1"></line><line id="SvgjsLine1011" x1="622" y1="258" x2="749" y2="97" stroke="#000000" stroke-width="1"></line></svg>';
      $canvas = CanvasController::sanitise($svg);
      $this->assertTrue($canvas!=null);
    }
}
